import React from 'react';

/**
 * PlatformSelector Component
 * Renders a checkbox grid of social media platforms.
 * 
 * Props:
 * - selectedPlatforms (object): An object mapping platform IDs to booleans (e.g. { twitter: true, facebook: false }).
 * - onTogglePlatform (function): Callback function triggered when a platform card is clicked.
 * - platforms (array): Array of platform metadata structures (id, name, limit).
 */
export default function PlatformSelector({ selectedPlatforms, onTogglePlatform, platforms }) {
  return (
    <div className="composer-section">
      <h3 className="section-title">1. Select Target Platforms</h3>
      <div className="platform-grid">
        {platforms.map((platform) => {
          const isSelected = !!selectedPlatforms[platform.id];
          
          return (
            <label 
              key={platform.id}
              className={`platform-checkbox-label ${isSelected ? 'selected' : ''}`}
              data-platform={platform.id}
            >
              {/* Hidden native checkbox - critical for accessibility and standard HTML forms */}
              <input 
                type="checkbox"
                checked={isSelected}
                onChange={() => onTogglePlatform(platform.id)}
              />
              
              {/* Custom styled checkbox indicator */}
              <div className="custom-checkbox"></div>
              
              {/* Platform Name and Limits info */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '1rem', fontWeight: '600' }}>{platform.name}</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Limit: {platform.limit.toLocaleString()}</span>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
