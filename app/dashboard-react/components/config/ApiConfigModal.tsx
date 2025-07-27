import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings } from 'lucide-react';
import { useApiConfig } from '@/hooks/useApiConfig';

const ApiConfigModal = () => {
  const { apiUrl, updateApiUrl } = useApiConfig();
  const [newUrl, setNewUrl] = useState(apiUrl);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    updateApiUrl(newUrl);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurar API</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="api-url">URL da API</Label>
            <Input
              id="api-url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="http://localhost:3000/api"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiConfigModal;
