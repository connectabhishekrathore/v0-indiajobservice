'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, LineChart as LineChartIcon, Users, DollarSign } from 'lucide-react';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('month');

  const analyticsData = {
    revenue: [
      { date: 'May 1', amount: 12500 },
      { date: 'May 5', amount: 19200 },
      { date: 'May 10', amount: 15800 },
      { date: 'May 15', amount: 28900 },
      { date: 'May 20', amount: 35600 },
      { date: 'May 25', amount: 42300 },
    ],
    topProducts: [
      { name: 'Offline Form PDF (₹20)', sales: 4532, revenue: 90640 },
      { name: 'Platform Fee (₹3)', sales: 15220, revenue: 45660 },
      { name: 'Premium Membership', sales: 892, revenue: 267600 },
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">Track revenue, user behavior, and platform performance</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {['week', 'month', 'quarter', 'year'].map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? 'default' : 'outline'}
            onClick={() => setTimeRange(range)}
            className="capitalize"
          >
            {range}
          </Button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹45,670</p>
            <p className="text-xs text-muted-foreground mt-1">+12% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              New Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1,245</p>
            <p className="text-xs text-muted-foreground mt-1">+8% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-purple-600" />
              Conversions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3.2%</p>
            <p className="text-xs text-muted-foreground mt-1">+0.5% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <LineChartIcon className="h-4 w-4 text-orange-600" />
              Downloads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">18,923</p>
            <p className="text-xs text-muted-foreground mt-1">+25% from last period</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>Daily revenue over the last month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-b from-muted/20 to-muted/5 rounded-lg border flex items-end justify-around p-4 gap-2">
            {analyticsData.revenue.map((data, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="w-full bg-gradient-to-t from-primary to-primary/80 rounded-t-lg transition-all hover:from-primary/90"
                  style={{ height: `${(data.amount / 50000) * 100}%`, minHeight: '4px' }}
                />
                <p className="text-xs text-muted-foreground text-center">{data.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Revenue Sources</CardTitle>
          <CardDescription>Best performing products and services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.topProducts.map((product, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.sales.toLocaleString()} sales</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{product.revenue.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">
                    {((product.revenue / 150000) * 100).toFixed(1)}% of total
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
