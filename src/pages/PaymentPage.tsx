import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../integrations/supabase/client';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { Upload, Wallet, CreditCard, DollarSign } from 'lucide-react';

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      isMetaMask?: boolean;
    };
  }
}

const PaymentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'yoomoney' | 'usdt' | 'metamask'>('yoomoney');
  const [usdtPrice, setUsdtPrice] = useState<number>(1);
  const [transactionHash, setTransactionHash] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [metamaskAccount, setMetamaskAccount] = useState<string>('');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (orderId) {
      fetchOrder();
    }
    
    fetchUsdtPrice();
    checkMetamaskConnection();
  }, [orderId, user]);

  const fetchOrder = async () => {
    if (!orderId) return;
    
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();
    
    if (error) {
      toast({
        title: "Ошибка",
        description: "Заказ не найден",
        variant: "destructive"
      });
      navigate('/dashboard');
      return;
    }
    
    setOrder(data);
  };

  const fetchUsdtPrice = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd');
      const data = await response.json();
      setUsdtPrice(data.tether?.usd || 1);
    } catch (error) {
      console.error('Failed to fetch USDT price:', error);
    }
  };

  const checkMetamaskConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setMetamaskAccount(accounts[0]);
        }
      } catch (error) {
        console.error('Metamask connection error:', error);
      }
    }
  };

  const connectMetamask = async () => {
    if (!window.ethereum) {
      toast({
        title: "Metamask не найден",
        description: "Установите расширение Metamask",
        variant: "destructive"
      });
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setMetamaskAccount(accounts[0]);
        toast({
          title: "Успешно подключено",
          description: "Metamask подключен",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка подключения",
        description: "Не удалось подключиться к Metamask",
        variant: "destructive"
      });
    }
  };

  const payWithMetamask = async () => {
    if (!metamaskAccount || !order) return;

    try {
      setLoading(true);
      
      // Convert USD to Wei (assuming 1 ETH = $3000 for demo)
      const ethAmount = (order.price / 3000).toFixed(6);
      const weiAmount = (parseFloat(ethAmount) * 1e18).toString(16);

      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: metamaskAccount,
          to: '0x9e00d62d50ef12d41394082d63aee3abf286d0c5', // Your wallet
          value: `0x${weiAmount}`,
        }],
      });

      await createPayment('metamask', order.price, 'ETH', txHash);
      
      toast({
        title: "Успешно!",
        description: "Платёж отправлен через Metamask",
      });
      
    } catch (error) {
      toast({
        title: "Ошибка платежа",
        description: "Не удалось выполнить платёж",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadScreenshot = async (): Promise<string | null> => {
    if (!screenshot || !user) return null;

    const fileExt = screenshot.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from('payment-screenshots')
      .upload(fileName, screenshot);

    if (error) {
      throw error;
    }

    return fileName;
  };

  const createPayment = async (method: string, amount: number, currency: string, hash?: string) => {
    if (!user || !order) return;

    let screenshotUrl = null;
    if (screenshot) {
      screenshotUrl = await uploadScreenshot();
    }

    const { error } = await supabase.from('payments').insert({
      order_id: order.id,
      user_id: user.id,
      payment_method: method,
      amount,
      currency,
      transaction_hash: hash || transactionHash,
      screenshot_url: screenshotUrl,
      status: 'pending'
    });

    if (error) {
      throw error;
    }
  };

  const handlePaymentSubmit = async () => {
    if (!order || !user) return;

    try {
      setLoading(true);

      if (paymentMethod === 'metamask') {
        await payWithMetamask();
      } else if (paymentMethod === 'yoomoney') {
        window.open('https://yoomoney.ru/to/410019220622751/50000', '_blank');
        await createPayment('yoomoney', order.price, 'RUB');
      } else if (paymentMethod === 'usdt') {
        const usdtAmount = order.price / usdtPrice;
        await createPayment('usdt', usdtAmount, 'USDT');
      }

      toast({
        title: "Успешно!",
        description: "Информация о платеже сохранена",
      });

      navigate('/dashboard');
      
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обработать платёж",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!order) {
    return <div className="flex justify-center items-center min-h-screen">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Оплата заказа</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Info */}
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold">Заказ: {order.service}</h3>
              <p className="text-gray-600">Сумма: ${order.price}</p>
            </div>

            {/* Payment Method Selection */}
            <div>
              <Label>Способ оплаты</Label>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <Button
                  variant={paymentMethod === 'yoomoney' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('yoomoney')}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <CreditCard className="w-6 h-6 mb-2" />
                  Ю.Мани
                </Button>
                <Button
                  variant={paymentMethod === 'usdt' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('usdt')}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <DollarSign className="w-6 h-6 mb-2" />
                  USDT
                </Button>
                <Button
                  variant={paymentMethod === 'metamask' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('metamask')}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <Wallet className="w-6 h-6 mb-2" />
                  Metamask
                </Button>
              </div>
            </div>

            {/* Payment Details */}
            {paymentMethod === 'usdt' && (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded">
                  <p className="font-semibold">USDT BEP-20 адрес:</p>
                  <p className="font-mono text-sm break-all">0x9e00d62d50ef12d41394082d63aee3abf286d0c5</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Сумма: {(order.price / usdtPrice).toFixed(6)} USDT
                    <br />
                    (курс: ${usdtPrice.toFixed(4)})
                  </p>
                </div>
              </div>
            )}

            {paymentMethod === 'metamask' && (
              <div className="space-y-4">
                {!metamaskAccount ? (
                  <Button onClick={connectMetamask} className="w-full">
                    Подключить Metamask
                  </Button>
                ) : (
                  <div className="bg-green-50 p-4 rounded">
                    <p className="text-sm">Подключен: {metamaskAccount.slice(0, 6)}...{metamaskAccount.slice(-4)}</p>
                  </div>
                )}
              </div>
            )}

            {/* Transaction Hash Input */}
            {paymentMethod !== 'metamask' && (
              <div>
                <Label htmlFor="hash">Хэш транзакции</Label>
                <Input
                  id="hash"
                  value={transactionHash}
                  onChange={(e) => setTransactionHash(e.target.value)}
                  placeholder="Введите хэш транзакции"
                />
              </div>
            )}

            {/* Screenshot Upload */}
            <div>
              <Label htmlFor="screenshot">Скриншот оплаты</Label>
              <Input
                id="screenshot"
                type="file"
                accept="image/*"
                onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
              />
            </div>

            {/* Submit Button */}
            <Button 
              onClick={handlePaymentSubmit} 
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Обработка...' : 'Подтвердить оплату'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentPage;