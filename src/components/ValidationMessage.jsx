import React from 'react';

/**
 * ValidationMessage Component
 * Displays success (green) or error (red) banner based on post validity.
 * 
 * Props:
 * - errors (array): List of platform errors containing platform name and characters exceeded.
 * - hasText (boolean): Whether the user has typed anything.
 * - hasSelectedPlatforms (boolean): Whether at least one platform checkbox is selected.
 */
export default function ValidationMessage({ errors, hasText, hasSelectedPlatforms }) {
  // If no platforms are selected, do not show any validation banner
  if (!hasSelectedPlatforms) {
    return null;
  }

  // If there are validation errors, render the error state
  if (errors.length > 0) {
    return (
      <div className="validation-banner error">
        <div className="validation-banner-title">
          <span>❌</span> Validation Failed
        </div>
        <ul className="validation-banner-details">
          {errors.map((error, index) => (
            <li key={index}>
              <strong>{error.name}</strong> limit exceeded by {error.exceededBy} character(s).
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // If text is typed and it passes validation, render success state
  if (hasText) {
    return (
      <div className="validation-banner success">
        <div className="validation-banner-title">
          <span>✅</span> Ready to Publish
        </div>
        <p style={{ fontSize: '0.9rem', paddingLeft: '1.5rem' }}>
          Your post satisfies character limits for all selected platforms!
        </p>
      </div>
    );
  }

  // Fallback: Selected platforms but textarea is empty
  return null;
}
