import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Alert, AlertDescription } from '../src/components/ui/alert';
import { Card, CardHeader, CardTitle, CardContent } from '../src/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../src/components/ui/tabs'

const ColorPalette = () => {
  const [copiedColor, setCopiedColor] = useState(null);

  const primaryColors = [
    { name: '100', hex: '#f5f3ff' },
    { name: '200', hex: '#ede9fe' },
    { name: '300', hex: '#ddd6fe' },
    { name: '400', hex: '#c4b5fd' },
    { name: '500', hex: '#a78bfa' },
    { name: '600', hex: '#8b5cf6' },
    { name: '700', hex: '#7c3aed' },
    { name: '800', hex: '#6d28d9' },
    { name: '900', hex: '#5b21b6' },
    { name: '950', hex: '#2e1065' }
  ];

  const yangColors = [
    { name: '100', hex: '#FFF4E1' },
    { name: '200', hex: '#FFE2B3' },
    { name: '300', hex: '#FFD299' },
    { name: '400', hex: '#FFBF80' },
    { name: '500', hex: '#FFB347' },
    { name: '600', hex: '#FFA033' },
    { name: '700', hex: '#FF8F1F' },
    { name: '800', hex: '#FF7F0A' },
    { name: '900', hex: '#FF6F00' }
  ];

  const functionalColors = {
    error: [
      { name: 'Light', hex: '#FEE2E2' },
      { name: 'Base', hex: '#F87171' },
      { name: 'Dark', hex: '#B91C1C' }
    ],
    success: [
      { name: 'Light', hex: '#D1FAE5' },
      { name: 'Base', hex: '#10B981' },
      { name: 'Dark', hex: '#047857' }
    ],
    progress: [
      { name: 'Light', hex: '#DBEAFE' },
      { name: 'Base', hex: '#3B82F6' },
      { name: 'Dark', hex: '#1D4ED8' }
    ]
  };

  const neutralColors = [
    { name: '100', hex: '#F3F4F6' },
    { name: '300', hex: '#D1D5DB' },
    { name: '500', hex: '#6B7280' },
    { name: '700', hex: '#374151' },
    { name: '900', hex: '#111827' },
    { name: 'Black', hex: '#0F0E0E' },
    { name: 'White', hex: '#FFFFFF' }
  ];

  const copyToClipboard = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const ColorCard = ({ color, showBorder = false }) => (
    <div
      className={`relative group cursor-pointer p-4 h-24 rounded-lg transition-all duration-200 hover:scale-105 ${showBorder ? 'border border-gray-200' : ''
        }`}
      style={{ backgroundColor: color.hex }}
      onClick={() => copyToClipboard(color.hex)}
    >
      <div className={`absolute bottom-2 left-2 right-2 p-2 rounded bg-white/90 shadow-sm 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200
        flex justify-between items-center`}>
        <span className="font-medium text-sm">{color.name}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono">{color.hex}</span>
          {copiedColor === color.hex ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-gray-500" />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Heed Color Palette</h1>
          <p className="text-gray-600">Click any color to copy its HEX code</p>
        </header>

        {copiedColor && (
          <Alert className="fixed top-4 right-4 w-auto bg-white shadow-lg">
            <AlertDescription className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Copied {copiedColor} to clipboard!</span>
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="primary" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="primary">Primary Purple</TabsTrigger>
            <TabsTrigger value="yang">Yang Orange</TabsTrigger>
            <TabsTrigger value="functional">Functional</TabsTrigger>
            <TabsTrigger value="neutral">Neutral</TabsTrigger>
          </TabsList>

          <TabsContent value="primary">
            <Card>
              <CardHeader>
                <CardTitle>Primary Purple Palette</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {primaryColors.map((color) => (
                    <ColorCard key={color.hex} color={color} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="yang">
            <Card>
              <CardHeader>
                <CardTitle>Yang Orange-Yellow Palette</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {yangColors.map((color) => (
                    <ColorCard key={color.hex} color={color} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="functional">
            <Card>
              <CardHeader>
                <CardTitle>Functional Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {Object.entries(functionalColors).map(([category, colors]) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold mb-4 capitalize">{category}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {colors.map((color) => (
                        <ColorCard key={color.hex} color={color} showBorder={color.name === 'Light'} />
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="neutral">
            <Card>
              <CardHeader>
                <CardTitle>Neutral Colors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {neutralColors.map((color) => (
                    <ColorCard key={color.hex} color={color} showBorder={color.hex === '#FFFFFF'} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ColorPalette;