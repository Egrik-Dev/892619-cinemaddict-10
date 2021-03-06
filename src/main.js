import Api from './api/index.js';
import Provider from './api/provider.js';
import Store from './api/store.js';
import AvatarComponent from './components/avatar.js';
import FilmsComponent from './components/films.js';
import PageControllerComponent from './controllers/page-controller.js';
import FilterController from './controllers/filter-controller.js';
import SortController from './controllers/sort-controller';
import StatisticsController from './controllers/statistics-controller.js';
import MoviesModel from './models/movies';
import {render, RenderPosition} from './utils/render.js';
import {MenuType} from './utils/filters-sort.js';

const STORE_PREFIX = `cinemaAddict-localstorage`;
const STORE_VER = `v1`;
const CACHE_NAME = `${STORE_PREFIX}-${STORE_VER}`;
const AUTHORIZATION = `Basic eo0w590ik29889a`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
  .then(() => {
    document.title += `[SW]`;
  }).catch(() => {
    document.title += `[NO SW]`;
  });
});

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(CACHE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const moviesModel = new MoviesModel();

const headerElement = document.querySelector(`.header`);
const mainMenuElement = document.querySelector(`.main`);
const footerAllFilmsElement = document.querySelector(`.footer__statistics`).querySelector(`p`);

const filmsComponent = new FilmsComponent();
const pageControllerComponent = new PageControllerComponent(filmsComponent, moviesModel, apiWithProvider);
const filterController = new FilterController(mainMenuElement, moviesModel);
const sortController = new SortController(mainMenuElement, moviesModel);
const statisticsController = new StatisticsController(mainMenuElement, moviesModel);

filterController.render();
sortController.render();
render(mainMenuElement, filmsComponent, RenderPosition.BEFOREEND);
pageControllerComponent.enableLoadingStatus(true);
pageControllerComponent.render();

apiWithProvider.getFilms()
  .then((films) => {
    moviesModel.setFilms(films);
    render(headerElement, new AvatarComponent(films), RenderPosition.BEFOREEND);
    pageControllerComponent.enableLoadingStatus(false);
    pageControllerComponent.render();
    statisticsController.render();
    statisticsController.hide();
    footerAllFilmsElement.replaceWith(`${films.length} movies inside`);
  });

filterController.setMenuTypeClickHandler((menuType) => {
  switch (menuType) {
    case MenuType.FILTER:
      pageControllerComponent.show();
      sortController.show();
      statisticsController.hide();
      break;
    case MenuType.STATS:
      pageControllerComponent.hide();
      sortController.hide();
      statisticsController.show();
      break;
  }
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  if (!apiWithProvider.getSynchronize()) {
    apiWithProvider.sync();
  }
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
