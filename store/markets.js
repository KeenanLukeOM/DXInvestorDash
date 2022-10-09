/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
/* eslint-disable quotes */
import CoinGecko from "coingecko-api";
import { currencies } from "~/libs/lists";
import { formatPrice } from "~/libs/utils";

const state = () => ({
  coinGecko: false,
  prices: {},
  userSelectedCurrency: false
});

/**
 * Getters for the object, these are like computed properties.
 *
 * @type {Object}
 */
const getters = {
  coinGecko(state) {
    return state.coinGecko;
  },
  prices(state) {
    if (state.prices.eth && state.prices.dxd && state.prices.eth2) {
      return state.prices;
    }
    return false;
  },
  max(state) {
    return state.max;
  },
  userSelectedCurrency(state) {
    return state.userSelectedCurrency || currencies[0];
  },
  eth(state, getters) {
    if (["usd", "eur", "gbp"].includes(getters.userSelectedCurrency.id)) {
      if (getters.prices && getters.coinGecko) {
        const eth = getters.coinGecko.find(item => item.id === "ethereum");
        return Object.assign({}, eth, {
          current_price: getters.prices.eth
        });
      }
    }
    if (getters.coinGecko) {
      return getters.coinGecko.find(item => item.id === "ethereum");
    }
    return false;
  },
  eth2(state, getters) {
    if (["usd", "eur", "gbp"].includes(getters.userSelectedCurrency.id)) {
      if (getters.prices && getters.coinGecko) {
        const eth2 = getters.coinGecko.find(item => item.id === "seth2");
        return Object.assign({}, eth2, {
          current_price: getters.prices.eth2
        });
      }
    }
    if (getters.coinGecko) {
      return getters.coinGecko.find(item => item.id === "seth2");
    }
    return false;
  },
  eth24hPercentChange(state, getters) {
    if (getters.coinGecko && getters.eth) {
      return getters.eth.price_change_percentage_24h.toFixed(2);
    }
    return 0;
  },
  dxd(state, getters) {
    if (["usd", "eur", "gbp"].includes(getters.userSelectedCurrency.id)) {
      if (getters.prices && getters.coinGecko) {
        const dxd = getters.coinGecko.find(item => item.id === "dxdao");
        return Object.assign({}, dxd, {
          current_price: getters.prices.dxd
        });
      }
    }
    if (getters.coinGecko) {
      return getters.coinGecko.find(item => item.id === "dxdao");
    }
    return false;
  },
  dxd24hPercentChange(state, getters) {
    if (getters.coinGecko && getters.dxd) {
      return getters.dxd.price_change_percentage_24h.toFixed(2);
    }
    return 0;
  },
  ratio(state, getters) {
    if (getters.eth && getters.dxd) {
      return (getters.eth.current_price / getters.dxd.current_price).toFixed(6);
    }
    return 0;
  },
  ratioDollars(state, getters) {
    if (getters.eth) {
      return formatPrice(
        getters.eth.current_price,
        getters.userSelectedCurrency.format,
        getters.userSelectedCurrency.id
      );
    }
    return 0;
  },
  ratioPercent(state, getters) {
    if (getters.ratio && getters.flippening) {
      return ((getters.ratio / getters.flippening) * 100).toFixed(2);
    }
    return 0;
  },
  flippening(state, getters) {
    if (getters.eth && getters.dxd) {
      return (
        getters.dxd.circulating_supply / getters.eth.circulating_supply
      ).toFixed(5);
    }
    return 0;
  },
  deserved(state, getters) {
    if (getters.flippening) {
      return (getters.flippening / 2).toFixed(5);
    }
    return "0.75";
  },
  deservedDollars(state, getters) {
    if (getters.eth) {
      return formatPrice(
        (getters.deserved / getters.ratio) * getters.eth.current_price,
        getters.userSelectedCurrency.format,
        getters.userSelectedCurrency.id
      );
    }
    return 0;
  },
  targetDollars(state, getters) {
    if (getters.eth && getters.flippening) {
      return formatPrice(
        (getters.flippening / getters.ratio) * getters.eth.current_price,
        getters.userSelectedCurrency.format,
        getters.userSelectedCurrency.id
      );
    }
    return 0;
  },
  targetDollars2x(state, getters) {
    if (getters.eth && getters.flippening) {
      return formatPrice(
        ((getters.flippening * 2) / getters.ratio) * getters.eth.current_price,
        getters.userSelectedCurrency.format,
        getters.userSelectedCurrency.id
      );
    }
    return 0;
  },
  targetDollars3x(state, getters) {
    if (getters.eth && getters.flippening) {
      return formatPrice(
        ((getters.flippening * 3) / getters.ratio) * getters.eth.current_price,
        getters.userSelectedCurrency.format,
        getters.userSelectedCurrency.id
      );
    }
    return 0;
  },
  targetDollars4x(state, getters) {
    if (getters.eth && getters.flippening) {
      return formatPrice(
        ((getters.flippening * 4) / getters.ratio) * getters.eth.current_price,
        getters.userSelectedCurrency.format,
        getters.userSelectedCurrency.id
      );
    }
    return 0;
  }
};

/**
 * Actions for this module. This is where all async should take place.
 *
 * @type {Object}
 */
const actions = {
  async restoreUserPreferredCurrency({ state, commit }, cookies) {
    const userStoredCurrency = cookies
      ? await cookies.get("dxinvestordash-currency")
      : state.userSelectedCurrency;
    const currency = userStoredCurrency || currencies[0];
    if (userStoredCurrency) {
      commit("setUserSelectedCurrency", currency);
    }
  },
  async fetchCoinGecko({ state, commit }, cookies) {
    const coinGecko = new CoinGecko();
    const markets = await coinGecko.coins.markets({
      ids: ["dxdao", "ethereum", "seth2"],
      vs_currency: state.userSelectedCurrency.id
    });
    commit("setCoinGeckoData", markets.data);
  },
  updateUserSelectedCurrency({ commit, dispatch }, { cookies, data }) {
    cookies.set("dxinvestordash-currency", data, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365
    });
    commit("setUserSelectedCurrency", data);
  }
};

/**
 * List of all possible mutators, these need to be pure functions.
 *
 * @type {Object}
 */
const mutations = {
  setCoinGecko(state, payload) {
    state.coinGecko = payload;
  },
  setCoinGeckoData(state, payload) {
    state.coinGecko = payload;
  },
  setPrices(state, payload) {
    let price = {};
    if (payload.product_id.startsWith("ETH")) {
      price = {
        eth: payload.price
      };
    } else if (payload.product_id.startsWith("dxd")) {
      price = {
        dxd: payload.price
      };
    }
    state.prices = Object.assign({}, state.prices, price);
  },
  resetPrices(state) {
    state.prices = {};
  },
  setUserSelectedCurrency(state, payload) {
    state.userSelectedCurrency = payload;
  }
};

/**
 * Finally we export the module for our store to use (see ../index.js)
 */
export default {
  state,
  getters,
  actions,
  mutations
};
