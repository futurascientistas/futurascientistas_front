import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { MoreHorizontal, LucideIcon } from 'lucide-react';
import { Button } from '../ui/button';

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  changeType?: "positive" | "negative";
  changeColor?: string;
  icon?: LucideIcon;
}

const KpiCard: React.FC<KpiCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType = "positive", 
  changeColor,
  icon: Icon 
}) => {
  const getChangeColor = () => {
    if (changeColor) return changeColor;
    return changeType === "positive" ? "text-green-600" : "text-red-600";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-brand-purple-vibrant">{value}</div>
        <p className={`text-xs ${getChangeColor()}`}>{change} this month</p>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
