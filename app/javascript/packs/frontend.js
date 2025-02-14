import ReactRailsUJS from "react_ujs";
import 'react-toastify/dist/ReactToastify.css';
import 'react-slideshow-image/dist/styles.css';
import Rails from '@rails/ujs';

Rails.start();

ReactRailsUJS.useContext(require.context("components", true));