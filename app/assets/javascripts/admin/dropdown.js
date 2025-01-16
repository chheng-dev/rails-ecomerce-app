$(document).ready(function () {
  const dropdownMap = {
    categories: {
      dropdown: '#categoryDropdown',
      menu: '#categoryDropdownMenu',
      icon: '#categoryIcon',
      title: '#categoryTitle',
      links: {
        '/admin/categories': '#listLink',
        '/admin/categories/new': '#createLink',
      },
    },
    brands: {
      dropdown: '#brandDropdown',
      menu: '#brandDropdownMenu',
      icon: '#brandIcon',
      title: '#brandTitle',
      links: {
        '/admin/brands': '#brandListLink',
        '/admin/brands/new': '#brandCreateLink',
      },
    },
    products: {
      dropdown: '#productDropdown',
      menu: '#productDropdownMenu',
      icon: '#productIcon',
      title: '#productTitle',
      links: {
        '/admin/products': '#productListLink',
        '/admin/products/new': '#productCreateLink',
      },
    },
  };

  const currentPath = window.location.pathname;

  for (const key in dropdownMap) {
    const { menu, icon, title, links } = dropdownMap[key];
    if (currentPath in links) {
      $(menu).removeClass('hidden').addClass('open');
      $(icon).addClass('filter-primary').removeClass('filter-gray');
      $(title).addClass('text-white').removeClass('text-gray-400');
      $(links[currentPath]).addClass('text-white').removeClass('text-gray-400');
    }
  }

  // Attach toggle event to each dropdown
  for (const key in dropdownMap) {
    const { dropdown, menu, icon, title } = dropdownMap[key];
    $(dropdown).on('click', function (e) {
      e.preventDefault();
      $(menu).toggleClass('hidden open');
      $(icon).toggleClass('filter-gray filter-white');
      $(title).toggleClass('text-gray-400 text-white');
    });
  }
});
