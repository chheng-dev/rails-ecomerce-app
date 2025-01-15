$(document).ready(function () {
  const currentPath = window.location.pathname;

  // Handle initial visibility and styling based on the URL
  if (currentPath === '/admin/categories/new' || currentPath === '/admin/categories') {
    $('#categoryDropdownMenu').removeClass('hidden').addClass('open');
  }

  if (currentPath === '/admin/categories') {
    $('#listLink').addClass('text-white').removeClass('text-gray-400');
    $('#createLink').removeClass('text-white').addClass('text-gray-400');
    $('#categoryTitle').addClass('text-white');
  } else if (currentPath === '/admin/categories/new') {
    $('#createLink').addClass('text-white').removeClass('text-gray-400');
    $('#listLink').removeClass('text-white').addClass('text-gray-400');
    $('#categoryTitle').addClass('text-white');
  }

  // Toggle dropdown menu visibility and icon
  $('#categoryDropdown').on('click', function (e) {
    e.preventDefault(); // Prevent default link behavior

    $('#categoryDropdownMenu').toggleClass('hidden open');

    // Toggle the dropdown icon
    const $icon = $('#dropdownIcon');
    $('#categoryTitle').addClass('text-white');
    $('#categoryIcon').removeClass('filter-gray')
    $('#categoryIcon').addClass('filter-white')

  });
});
