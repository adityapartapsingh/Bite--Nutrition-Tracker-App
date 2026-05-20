import React, { useEffect, useRef } from 'react';

function BarcodeScanner({ active, onScanSuccess, onScanError }) {
  const scannerRef = useRef(null);
  const readerRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const Html5QrcodeScanner = window.Html5QrcodeScanner;
    const Html5QrcodeSupportedFormats = window.Html5QrcodeSupportedFormats;

    if (!Html5QrcodeScanner) {
      console.error('html5-qrcode library not loaded');
      if (onScanError) onScanError('Barcode scanner library not loaded');
      return;
    }

    // Small delay to ensure DOM element is mounted
    const timer = setTimeout(() => {
      try {
        const config = {
          fps: 10,
          qrbox: { width: 250, height: 150 },
          rememberLastUsedCamera: true,
          aspectRatio: 1.0,
        };

        if (Html5QrcodeSupportedFormats) {
          config.formatsToSupport = [
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.EAN_8,
            Html5QrcodeSupportedFormats.UPC_A,
            Html5QrcodeSupportedFormats.UPC_E,
          ];
        }

        const scanner = new Html5QrcodeScanner('barcode-reader', config, false);

        scanner.render(
          (decodedText) => {
            scanner.clear().catch(() => {});
            if (onScanSuccess) onScanSuccess(decodedText);
          },
          (errorMessage) => {
            // Scanning errors are normal during scanning, don't propagate
          }
        );

        scannerRef.current = scanner;
      } catch (err) {
        console.error('Scanner init error:', err);
        if (onScanError) onScanError('Failed to initialize scanner');
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
        scannerRef.current = null;
      }
    };
  }, [active, onScanSuccess, onScanError]);

  if (!active) return null;

  return (
    <div className="barcode-scanner" id="barcode-scanner">
      <div className="barcode-scanner__viewport">
        <div id="barcode-reader" ref={readerRef} />
      </div>
      <p className="barcode-scanner__hint">
        Point your camera at a product barcode
      </p>
    </div>
  );
}

export default BarcodeScanner;
