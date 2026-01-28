# Embla Slider for Gutenberg

A powerful, responsive, and highly customizable slider block for the WordPress Gutenberg editor. Built with [Embla Carousel](https://www.embla-carousel.com/), this plugin offers a premium slider experience with extensive styling options, perfect for hero sections, feature showcases, and more.

![License](https://img.shields.io/badge/license-GPL--3.0-blue.svg)
![WordPress](https://img.shields.io/badge/WordPress-Gutenberg-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)

## 🌟 Features

*   **Responsive Design**: Fully responsive with customizable slide widths for Desktop and Mobile.
*   **Performance Focused**: Lightweight and optimized, leveraging the performant Embla Carousel engine.
*   **Rich Customization**:
    *   **Slides**: Add unlimited slides with background images.
    *   **Typography**: Full control over Primary and Secondary headings (Tags, Colors, Desktop/Mobile Sizes).
    *   **Spacing**: Adjustable gaps between text elements and buttons.
    *   **Buttons**: Add multiple call-to-action buttons per slide. Buttons inherit styles from your theme or Global Styles (FSE), with optional "Fill" or "Outline" variants.
    *   **Alignment**: Matrix control for precise content positioning (e.g., Top Left, Center, Bottom Right).
*   **Navigation Controls**:
    *   **Arrows**: Toggle visibility, choose from 6 icon styles (Chevron, Arrow, Triangle, etc.), and switch between Fill/Outline styles.
    *   **Dots**: Toggle visibility and choose from various shapes (Circle, Square, Rectangle).
*   **Display Settings**:
    *   **Overlay**: Optional dark overlay for better text readability.
    *   **Autoplay**: Toggle automatic sliding.
    *   **Gap Control**: Adjust spacing between slides.
    *   **Dimensions**: Custom slide height and width settings.

## 🚀 Installation

1.  Download the plugin zip file.
2.  Go to your WordPress Admin Dashboard.
3.  Navigate to **Plugins > Add New**.
4.  Click **Upload Plugin** and select the zip file.
5.  **Activate** the plugin.

## 📖 Usage

1.  Open a Page or Post in the WordPress Editor.
2.  Click the **+** (Add Block) button.
3.  Search for **"Embla Slider"** and add it to your content.
4.  **Add Slides**: Click the "Add Slide" button in the block inspector or the main area.
5.  **Customize**: Use the Inspector (sidebar) to adjust settings for the slider and individual slides.

## ⚙️ Configuration Options

### Slider Settings (Sidebar)

*   **Arrows**:
    *   Show/Hide Arrows.
    *   Icon Style: Thin Chevron, Chevron, Thin Arrow, Arrow, Triangle, Thin Triangle.
    *   Button Style: Fill or Outline.
    *   Rounded Arrows toggle.
*   **Dots**:
    *   Show/Hide Dots.
    *   Icon Style: Circle Fill, Circle Outline, Square Fill, Rectangle Fill.
*   **Display Settings**:
    *   Overlay: Toggle background overlay.
    *   Autoplay: Enable/Disable auto-sliding.
*   **Slider Dimensions**:
    *   **Gap**: Space between slides (px).
    *   **Slide Width**: Percentage width for Desktop and Mobile.
    *   **Slide Height**: Height of the slider (vh).

### Slide Content (Per Slide)

*   **Background**: Upload or select an image from the Media Library.
*   **Alignment**: Position content using the 3x3 matrix control.
*   **Primary Text**:
    *   Content, HTML Tag (h1-h6, p), Color.
    *   Responsive Font Sizes (Desktop & Mobile).
    *   Gap after text.
*   **Secondary Text**:
    *   Content, HTML Tag, Color.
    *   Responsive Font Sizes.
    *   Gap after text.
*   **Buttons**:
    *   Add multiple buttons.
    *   Add multiple buttons.
    *   Customize Text, Link, and Style (Fill/Outline).
    *   *Note: Core styles are inherited from your theme/Global Styles.*

## 🎨 Styling Buttons (Full Site Editing)

This plugin uses standard WordPress button markup, meaning it automatically inherits styles from your active theme and Global Styles. To customize button appearance:

1.  Go to **Appearance > Editor** (Site Editor).
2.  Click on **Styles** (the half-moon icon).
3.  Select **Blocks > Buttons**.
4.  Here you can define the default look for all buttons, including:
    *   Background & Text Colors
    *   Typography
    *   Border Radius & Width
    *   Padding

For more details, refer to the [WordPress Global Styles Documentation](https://wordpress.org/documentation/article/styles-overview/).

## 💻 Development

This plugin is built using **React**, **TypeScript**, and **Sass**, following the **Flux architecture** for state management.

### Prerequisites

*   Node.js
*   npm

### Setup

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```

### Build Commands

*   **Start Development Server** (Hot Reload):
    ```bash
    npm start
    ```
*   **Build for Production**:
    ```bash
    npm run build
    ```
*   **Compile Sass**:
    ```bash
    npm run build:sass
    ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the GPL-3.0 License.