import React from 'react';

/**
 * CharacterCounter Component
 * Shows a character counter widget with a progress bar for each SELECTED platform.
 * 
 * Props:
 * - text (string): The current post text.
 * - selectedPlatforms (object): Active platform state mapping.
 * - platforms (array): Static platform metadata array.
 */
export default function CharacterCounter({ text, selectedPlatforms, platforms }) {
  const textLength = text.length;

  // Filter to show only the counters for platforms that are checked
  const activePlatforms = platforms.filter(p => selectedPlatforms[p.id]);

  if (activePlatforms.length === 0) {
    return (
      <div className="composer-section">
        <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.95rem' }}>
          Select a platform above to view character limits.
        </p>
      </div>
    );
  }

  return (
    <div className="composer-section">
      <h3 className="section-title">Character Limits</h3>
      <div className="counters-container">
        {activePlatforms.map((platform) => {
          const limit = platform.limit;
          const remaining = limit - textLength;
          const isOverLimit = textLength > limit;
          
          // Calculate progress percentage, cap at 100%
          const percentage = Math.min((textLength / limit) * 100, 100);

          // Visual status coloring threshold
          // Green: Safe (< 90%)
          // Warning/Orange: Close to limit (>= 90% and <= 100%)
          // Error/Red: Exceeded (> 100%)
          let statusClass = 'valid';
          if (isOverLimit) {
            statusClass = 'error';
          } else if (percentage >= 90) {
            statusClass = 'warning';
          }

          return (
            <div 
              key={platform.id} 
              className={`counter-badge ${isOverLimit ? 'error' : percentage >= 90 ? 'warning' : ''}`}
            >
              <div className="counter-header">
                <span className="counter-platform-name" data-platform={platform.id}>
                  {platform.name}
                </span>
                <span className="counter-numbers">
                  <span className="current">{textLength}</span>/{limit}
                </span>
              </div>

              {/* Progress bar container and custom bar fill */}
              <div className="progress-bar-container">
                <div 
                  className={`progress-fill ${statusClass}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              {/* Helpful descriptive banner inside the counter box if over limit */}
              {isOverLimit && (
                <div className="excess-tag">
                  {remaining * -1} characters over!
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
