import React, { useState } from 'react';
import PlatformSelector from './PlatformSelector';
import CharacterCounter from './CharacterCounter';
import ValidationMessage from './ValidationMessage';

// 1. Static Metadata for Platforms
// This is structured for easy lookup, styling mapping, and validation.
const PLATFORMS = [
  { id: 'twitter', name: 'Twitter/X', limit: 280 },
  { id: 'facebook', name: 'Facebook', limit: 63206 },
  { id: 'instagram', name: 'Instagram', limit: 2200 },
  { id: 'linkedin', name: 'LinkedIn', limit: 3000 }
];

export default function PostComposer() {
  // 2. State Hooks
  // We use useState to manage composer variables
  const [text, setText] = useState('');
  
  // selectedPlatforms is an object like { twitter: true, linkedin: false }
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    twitter: false,
    facebook: false,
    instagram: false,
    linkedin: false
  });
  
  // image holds details of selected image: { name: string, previewUrl: string, size: number }
  const [image, setImage] = useState(null);

  // 3. Toggle Platform Handler
  const handleTogglePlatform = (platformId) => {
    setSelectedPlatforms(prev => ({
      ...prev,
      [platformId]: !prev[platformId]
    }));
  };

  // 4. Image Upload Handlers (Frontend UI Only)
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a temporary local URL for visual previewing
      const previewUrl = URL.createObjectURL(file);
      setImage({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        previewUrl: previewUrl
      });
    }
  };

  const handleRemoveImage = () => {
    // Revoke object URL to prevent memory leaks in the browser
    if (image?.previewUrl) {
      URL.revokeObjectURL(image.previewUrl);
    }
    setImage(null);
  };

  // 5. Validation Logic
  // Check limit violations for each platform that is currently selected
  const validationErrors = [];
  PLATFORMS.forEach((platform) => {
    if (selectedPlatforms[platform.id]) {
      if (text.length > platform.limit) {
        validationErrors.push({
          id: platform.id,
          name: platform.name,
          exceededBy: text.length - platform.limit
        });
      }
    }
  });

  // Check helper conditions
  const hasSelectedPlatforms = Object.values(selectedPlatforms).some(val => val === true);
  const isTextEmpty = text.trim().length === 0;
  const isPostValid = hasSelectedPlatforms && !isTextEmpty && validationErrors.length === 0;

  // 6. Reset Handler
  const handleReset = () => {
    setText('');
    setSelectedPlatforms({
      twitter: false,
      facebook: false,
      instagram: false,
      linkedin: false
    });
    handleRemoveImage();
  };

  // 7. Publish Handler
  const handlePublish = () => {
    alert(`🎉 Success! Your post was simulated to publish!\n\nSummary:\n- Platforms: ${
      PLATFORMS.filter(p => selectedPlatforms[p.id]).map(p => p.name).join(', ')
    }\n- Characters: ${text.length}\n- Image attachment: ${image ? image.name : 'None'}`);
  };

  // 8. Format Selected Platforms list for Summary box
  const getSelectedPlatformsListString = () => {
    const list = PLATFORMS.filter(p => selectedPlatforms[p.id]).map(p => p.name);
    return list.length > 0 ? list.join(', ') : 'None';
  };

  return (
    <div className="composer-card">
      {/* Platform Checklist Capsule Grid */}
      <PlatformSelector 
        selectedPlatforms={selectedPlatforms}
        onTogglePlatform={handleTogglePlatform}
        platforms={PLATFORMS}
      />

      {/* Main Textarea Composition Box */}
      <div className="composer-section">
        <h3 className="section-title">2. Compose Your Message</h3>
        <div className="textarea-wrapper">
          <textarea
            className="post-textarea"
            placeholder="What's on your mind? Type your social post here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
      </div>

      {/* Image Upload section */}
      <div className="composer-section image-upload-area">
        <h3 className="section-title">3. Media Attachment (Optional)</h3>
        
        {/* Upload Trigger Input */}
        {!image ? (
          <div className="upload-button-wrapper">
            <button className="custom-upload-btn">
              <span>📷</span> Add Image
            </button>
            <input 
              type="file"
              accept="image/*"
              className="hidden-file-input"
              onChange={handleImageChange}
            />
          </div>
        ) : (
          /* File Attachment Preview Dashboard */
          <div className="preview-container">
            <img 
              src={image.previewUrl} 
              alt="Upload Preview" 
              className="image-preview"
            />
            <div className="image-details">
              <span className="filename">{image.name}</span>
              <span className="filesize">{image.size}</span>
            </div>
            <button 
              type="button" 
              className="remove-image-btn" 
              onClick={handleRemoveImage}
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Dynamic Character limits tracker */}
      <CharacterCounter 
        text={text}
        selectedPlatforms={selectedPlatforms}
        platforms={PLATFORMS}
      />

      {/* System State Banner */}
      <ValidationMessage 
        errors={validationErrors}
        hasText={text.length > 0}
        hasSelectedPlatforms={hasSelectedPlatforms}
      />

      {/* Viva Required: Live Stats Summary Box */}
      <div className="summary-box">
        <div className="summary-item">
          <span className="summary-label">Target Channels</span>
          <span className="summary-value" style={{ fontSize: '0.95rem' }}>
            {getSelectedPlatformsListString()}
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Character Count</span>
          <span className="summary-value">{text.length} characters</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Composer Status</span>
          <div>
            {isPostValid ? (
              <span className="status-badge ready">Ready to Publish</span>
            ) : (
              <span className="status-badge needs-changes">Needs Changes</span>
            )}
          </div>
        </div>
      </div>

      {/* Composer Action buttons footer */}
      <div className="composer-actions">
        <button
          className="btn btn-primary"
          onClick={handlePublish}
          disabled={!isPostValid}
        >
          🚀 Publish Post
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleReset}
        >
          🔄 Reset Form
        </button>
      </div>
    </div>
  );
}
