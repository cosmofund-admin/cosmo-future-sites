import React, { useState } from 'react';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: string;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, selectedService }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    telegram: '',
    whatsapp: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const servicePrice = selectedService === 'Лендинг' ? 500 :
                          selectedService === 'Корпоративный сайт' ? 1500 :
                          selectedService === 'Интернет-магазин' ? 2500 : 1000;

      const { error } = await supabase
        .from('orders')
        .insert([{
          name: formData.name,
          phone: formData.phone,
          telegram: formData.telegram,
          whatsapp: formData.whatsapp,
          email: formData.email,
          service: selectedService,
          message: formData.message,
          price: servicePrice,
          currency: 'USD',
          status: 'pending'
        }]);

      if (error) throw error;

      toast({
        title: "Заказ отправлен!",
        description: "Мы свяжемся с вами в ближайшее время.",
      });

      onClose();
      setFormData({
        name: '',
        phone: '',
        telegram: '',
        whatsapp: '',
        email: '',
        message: '',
      });
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось отправить заказ",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Заказать {selectedService}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Имя *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="telegram">Telegram</Label>
            <Input
              id="telegram"
              value={formData.telegram}
              onChange={(e) => setFormData({...formData, telegram: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="message">Сообщение</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Отправка...' : 'Отправить заказ'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;