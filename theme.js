// Function to get system theme
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

// Function to set theme
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeToggleButton();
}

// Function to toggle theme
function toggleTheme() {
  const currentTheme = localStorage.getItem('theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

// Function to update theme toggle button icon
function updateThemeToggleButton() {
  const button = document.querySelector('.theme-toggle');
  if (!button) return;

  const currentTheme = localStorage.getItem('theme') || 'light';

  const icons = {
    light: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"/></svg>`,
    dark: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.3807 2.01886C9.91573 3.38768 9 5.3369 9 7.49999C9 11.6421 12.3579 15 16.5 15C18.6631 15 20.6123 14.0843 21.9811 12.6193C21.6613 17.8537 17.3149 22 12 22C6.47715 22 2 17.5228 2 12C2 6.68514 6.14629 2.33869 11.3807 2.01886ZM12 20C16.4183 20 20 16.4183 20 12C20 11.8752 19.9957 11.7513 19.987 11.6285C19.0773 12.5012 17.8447 13 16.5 13C13.4624 13 11 10.5376 11 7.49999C11 6.15526 11.4988 4.92275 12.3715 4.01296C12.2487 4.00428 12.1248 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"/></svg>`,
  };

  button.innerHTML = icons[currentTheme];
  button.setAttribute(
    'title',
    `Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} theme`
  );
}

// Function to handle system theme changes
function handleSystemThemeChange(e) {
  if (localStorage.getItem('theme') === 'system') {
    updateThemeToggleButton();
  }
}

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
  // Create and append theme toggle button
  const button = document.createElement('button');
  button.className = 'theme-toggle';
  button.addEventListener('click', toggleTheme);
  document.querySelector('.container').appendChild(button);

  // Set initial theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  // Listen for system theme changes
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeMediaQuery.addListener(handleSystemThemeChange);
});
