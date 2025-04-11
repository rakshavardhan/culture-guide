
import { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency] = useState('USD');
  const [toCurrency] = useState('INR');
  const [result, setResult] = useState('');

  useEffect(() => {
    const rate = 80; // Fixed rate for demo
    const calculated = (parseFloat(amount) * rate).toFixed(2);
    setResult(calculated);
  }, [amount]);

  return (
    <div className="p-4 bg-white dark:bg-navy-light rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4">Currency Converter</h3>
      <div className="space-y-4">
        <div>
          <Label>Amount</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="flex justify-between items-center">
          <span>{fromCurrency}</span>
          <span>→</span>
          <span>{toCurrency}</span>
        </div>
        <div className="text-xl font-bold text-center">
          {result} {toCurrency}
        </div>
      </div>
    </div>
  </div>
