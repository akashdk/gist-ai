import React, { useState, useEffect } from 'react'
import '../../assets/tailwind.css'

function Sidepanel() {
  const [selectedText, setSelectedText] = useState<string>('');

  useEffect(() => {
    // Load initial text from storage
    chrome.storage.local.get(['selectedText'], (result) => {
      if (result.selectedText) {
        setSelectedText(result.selectedText);
      }
    });

    // Listen for storage changes
    const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      if (changes.selectedText?.newValue) {
        setSelectedText(changes.selectedText.newValue);
      }
    };

    chrome.storage.local.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.local.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Selected Text:</h2>
      <div className="border p-3 rounded-lg">
        {selectedText || 'No text selected'}
      </div>
    </div>
  )
}

export default Sidepanel
