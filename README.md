# Nikunj Arora - Student Portfolio

A modern, responsive portfolio website showcasing the projects, achievements, and interests of Nikunj Arora, an 8th grade student passionate about coding, mathematics, and science.

## 🌟 Live Demo

Visit the live website: [https://sachinlala.github.io/nikunj-portfolio/](https://sachinlala.github.io/nikunj-portfolio/)

## 📋 About

This portfolio website represents Nikunj's journey as a young developer and student. It features:

- **Projects**: Showcasing web applications, games, and robotics projects
- **Achievements**: Academic accomplishments and learning milestones
- **Interests**: Personal hobbies and areas of exploration
- **Contact**: Ways to connect and collaborate

## 🚀 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Accessibility**: Built with accessibility best practices
- **Performance**: Optimized for fast loading and smooth interactions
- **Easy Updates**: JSON-based content management for easy customization

## 🛠️ Technologies Used

- **HTML5**: Semantic markup for better accessibility and SEO
- **CSS3**: Modern styling with custom properties and flexbox/grid layouts
- **JavaScript**: Interactive features and smooth user experience
- **Google Fonts**: Inter font family for clean typography
- **GitHub Pages**: Free hosting and automatic deployment

## 📁 Project Structure

```
nikunj-portfolio/
├── assets/
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── js/
│   │   └── main.js            # Interactive functionality
│   └── images/                # Portfolio images and assets
├── data/
│   └── profile.json           # Portfolio content data
├── index.html                 # Main HTML file
├── package.json               # Node.js project configuration
├── .prettierrc                # Code formatting rules
├── .editorconfig              # Editor configuration
├── .gitignore                 # Git ignore rules
└── README.md                  # Project documentation
```

## 🏃‍♂️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sachinlala/nikunj-portfolio.git
   cd nikunj-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## 🎯 Available Scripts

- `npm run dev` - Start the development server with live reloading
- `npm run format` - Format all files using Prettier

## 🔧 Customization

### Updating Content

1. **Personal Information**: Edit the `data/profile.json` file to update personal details, projects, achievements, and interests.

2. **Images**: Add new images to the `assets/images/` folder and update the references in `profile.json` or `index.html`.

3. **Styling**: Modify `assets/css/style.css` to customize colors, fonts, and layout. The CSS uses custom properties (variables) for easy theming.

### Adding New Projects

To add a new project, update the `projects` array in `data/profile.json`:

```json
{
  "id": "new-project",
  "title": "My New Project",
  "description": "Description of the project",
  "image": "assets/images/new-project.jpg",
  "tags": ["HTML", "CSS", "JavaScript"],
  "links": {
    "demo": "https://link-to-demo.com",
    "github": "https://github.com/username/repo"
  },
  "featured": true
}
```

### Color Customization

The website uses CSS custom properties for easy color customization. Edit the `:root` section in `style.css`:

```css
:root {
  --primary-color: #3b82f6;      /* Main brand color */
  --accent-color: #f59e0b;       /* Accent color */
  --text-primary: #1e293b;       /* Main text color */
  /* ... other variables */
}
```

## 🚀 Deployment

### GitHub Pages (Automatic)

This repository is configured for automatic deployment to GitHub Pages:

1. Push changes to the `main` branch
2. GitHub Actions will automatically build and deploy the site
3. Visit your live site at `https://sachinlala.github.io/nikunj-portfolio/`

### Manual Deployment

You can also deploy to other platforms:

1. **Netlify**: Drag and drop the project folder to [Netlify](https://netlify.com)
2. **Vercel**: Import the repository at [Vercel](https://vercel.com)
3. **Custom Server**: Upload all files to your web server

## 🎨 Design Philosophy

This portfolio follows these design principles:

- **Simplicity**: Clean, uncluttered design that focuses on content
- **Accessibility**: WCAG 2.1 compliant with proper semantic markup
- **Performance**: Lightweight and fast-loading
- **Responsive**: Works perfectly on all device sizes
- **Student-Friendly**: Appropriate tone and content for a young developer

## 📱 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a personal portfolio, but suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add some improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 About the Developer

**Nikunj Arora** is an 8th grade student with a passion for:
- 💻 Programming and web development
- 🤖 Robotics and electronics
- 🧮 Mathematics and problem-solving
- 🔬 Science experiments and learning
- ♟️ Chess and strategic thinking
- 🏀 Basketball and staying active

## 📞 Contact

- 📧 Email: nikunj@example.com
- 🐙 GitHub: [@sachinlala](https://github.com/sachinlala)
- 🌐 Portfolio: [https://sachinlala.github.io/nikunj-portfolio/](https://sachinlala.github.io/nikunj-portfolio/)

## 🙏 Acknowledgments

- [Inter](https://rsms.me/inter/) font by Rasmus Andersson
- [Google Fonts](https://fonts.google.com/) for web font hosting
- [GitHub Pages](https://pages.github.com/) for free hosting
- Inspiration from the coding and student developer community

---

**Built with ❤️ by Nikunj Arora**

*Last updated: August 23, 2024*
