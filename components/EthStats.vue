<template>
  <div class="dxd-stats max-w-screen-sm m-auto">
    <table class="table-fixed">
      <thead>
        <tr>
          <td colspan="2" class="text-center leading-md">
            DXdao Statistics

            <small>(Last Update: {{ lastUpdated }})</small>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="w-1/2 text-right">
            <strong>DXdao Treasury Value</strong>
          </td>
          <td class="w-1/2">
            {{ formatPrice((dxdaoEthBalance() * eth.current_price), userSelectedCurrency.format, userSelectedCurrency.id) }}
            <!-- {{ formatPrice(((((dxdaoEthBalance / 1000000000000000000) + 231 + 2499 + 62 + 993 ) * eth.current_price), userSelectedCurrency.format, userSelectedCurrency.id )) }} -->
            <!-- + (((dxdaoDaiBalance / 1000000000000000000) + 395950 + 435110 + 1742699 + 207228)) + (((dxdaoUsdcBalance / 1000000) + 138533 + 441818 + 231992)) + (((dxdaoEth2Balance / 1000000000000000000) * eth2.current_price)) + (((dxdaoSwprBalance / 1000000000000000000) / 4 ) * swpr.current_price) + (((dxdaoEnsBalance / 1000000000000000000) / 4 ) * ens.current_price)) -->

            <!-- {{ ((dxdaoLusdBalance / 1000000000000000000)) }} -->
            <!-- {{ formatPrice((((dxdaoEnsBalance / 1000000000000000000) / 4 ) * ens.current_price), userSelectedCurrency.format, userSelectedCurrency.id ) }} -->
            <!-- {{ formatPrice(((dxdaoStethBalance / 1000000000000000000) * steth.current_price), userSelectedCurrency.format, userSelectedCurrency.id ) }} -->
            <!-- {{ formatPrice(((dxdaoSusdBalance / 1000000000000000000)), userSelectedCurrency.format, userSelectedCurrency.id ) }} -->
            <!-- {{ formatPrice(((dxdaoRethBalance / 1000000000000000000) * reth.current_price), userSelectedCurrency.format, userSelectedCurrency.id ) }} -->
            <!-- {{ formatPrice((5 * wbtc.current_price), userSelectedCurrency.format, userSelectedCurrency.id ) }} -->
            <!-- {{ formatPrice((848 * dpi.current_price), userSelectedCurrency.format, userSelectedCurrency.id ) }} -->
            <!-- {{ formatPrice(((255 * gno.current_price) / 4 ), userSelectedCurrency.format, userSelectedCurrency.id ) }} -->
          </td>
        </tr>
        <tr>
          <td class="w-1/2 text-right">
            <strong>DXD Circulating Supply</strong>
          </td>
          <td class="w-1/2">
            {{ dxdCirculatingSupply }}
          </td>
        </tr>
        <tr>
          <td class="w-1/2 text-right">
            <strong>All Time High (ATH)</strong>
          </td>
          <td class="w-1/2">
            {{ allTimeHigh }}
          </td>
        </tr>
        <tr>
          <td class="w-1/2 text-right">
            <strong>Percentage from ATH</strong>
          </td>
          <td class="w-1/2">
            {{ percentageFromAllTimeHigh }}
          </td>
        </tr>
        <tr>
          <td class="w-1/2 text-right">
            <strong>Days since ATH</strong>
          </td>
          <td class="w-1/2">
            {{ daysSinceAllTimeHigh }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { mapGetters } from 'vuex'
import _ from 'lodash'
import { formatPrice } from '~/libs/utils'

dayjs.extend(relativeTime)

export default {
  data () {
    return {
      dxdaoEthBal: {},
      dxdaoDaiBal: {},
      dxdaoUsdcBal: {},
      dxdaoEth2Bal: {},
      dxdaoSwprBal: {},
      dxdaoLusdBal: {},
      dxdaoEnsBal: {},
      dxdaoStethBal: {},
      dxdaoSusdBal: {},
      dxdaoRethBal: {}
    }
  },
  computed: {
    ...mapGetters({
      dxd: 'markets/dxd',
      eth: 'markets/eth',
      eth2: 'markets/eth2',
      swpr: 'markets/swpr',
      ens: 'markets/ens',
      steth: 'markets/steth',
      reth: 'markets/reth',
      wbtc: 'markets/wbtc',
      dpi: 'markets/dpi',
      gno: 'markets/gno',
      userSelectedCurrency: 'markets/userSelectedCurrency',
      wsPriceFeed: 'system/webSocketPriceFeed',
      fallbackPriceFeed: 'system/fallbackPriceFeed'
    }),
    // eslint-disable-next-line vue/return-in-computed-property
    // dxdaoEthBalance () {
    //   const api = require('etherscan-api').init(
    //     'FI9MR2BMJUNDXWVX76DT2GN3C28KRPMRFC'
    //   )
    //   const balance = api.account.balance(
    //     '0x519b70055af55a007110b4ff99b0ea33071c720a'
    //   )
    //   // eslint-disable-next-line vue/no-async-in-computed-properties
    //   balance.then(balanceData => balanceData.json)
    //   // eslint-disable-next-line no-return-assign, vue/no-async-in-computed-properties
    //   balance.then(data => this.dxdaoEthBal = data)
    //   // eslint-disable-next-line no-console
    //   console.log(this.dxdaoEthBal.result)
    //   return this.dxdaoEthBal.result
    // },
    dxdaoDaiBalance () {
      const api = require('etherscan-api').init(
        'FI9MR2BMJUNDXWVX76DT2GN3C28KRPMRFC'
      )
      const balance = api.account.tokenbalance(
        '0x519b70055af55a007110b4ff99b0ea33071c720a',
        '',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F'
      )
      // eslint-disable-next-line vue/no-async-in-computed-properties
      balance.then(balanceData => balanceData.json)
      // eslint-disable-next-line no-return-assign, vue/no-async-in-computed-properties
      balance.then(data => this.dxdaoDaiBal = data)
      return this.dxdaoDaiBal.result
    },
    dxdaoUsdcBalance () {
      const api = require('etherscan-api').init(
        'FI9MR2BMJUNDXWVX76DT2GN3C28KRPMRFC'
      )
      const balance = api.account.tokenbalance(
        '0x519b70055af55a007110b4ff99b0ea33071c720a',
        '',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
      )
      // eslint-disable-next-line vue/no-async-in-computed-properties
      balance.then(balanceData => balanceData.json)
      // eslint-disable-next-line no-return-assign, vue/no-async-in-computed-properties
      balance.then(data => this.dxdaoUsdcBal = data)
      return this.dxdaoUsdcBal.result
    },
    dxdaoEth2Balance () {
      const api = require('etherscan-api').init(
        'FI9MR2BMJUNDXWVX76DT2GN3C28KRPMRFC'
      )
      const balance = api.account.tokenbalance(
        '0x519b70055af55a007110b4ff99b0ea33071c720a',
        '',
        '0xFe2e637202056d30016725477c5da089Ab0A043A'
      )
      // eslint-disable-next-line vue/no-async-in-computed-properties
      balance.then(balanceData => balanceData.json)
      // eslint-disable-next-line no-return-assign, vue/no-async-in-computed-properties
      balance.then(data => this.dxdaoEth2Bal = data)
      return this.dxdaoEth2Bal.result
    },
    dxdaoLusdBalance () {
      const api = require('etherscan-api').init(
        'FI9MR2BMJUNDXWVX76DT2GN3C28KRPMRFC'
      )
      const balance = api.account.tokenbalance(
        '0x519b70055af55a007110b4ff99b0ea33071c720a',
        '',
        '0x5f98805A4E8be255a32880FDeC7F6728C6568bA0'
      )
      // eslint-disable-next-line vue/no-async-in-computed-properties
      balance.then(balanceData => balanceData.json)
      // eslint-disable-next-line no-return-assign, vue/no-async-in-computed-properties
      balance.then(data => this.dxdaoLusdBal = data)
      return this.dxdaoLusdBal.result
    },
    dxdaoSwprBalance () {
      const api = require('etherscan-api').init(
        'FI9MR2BMJUNDXWVX76DT2GN3C28KRPMRFC'
      )
      const balance = api.account.tokenbalance(
        '0x519b70055af55a007110b4ff99b0ea33071c720a',
        '',
        '0x6cAcDB97e3fC8136805a9E7c342d866ab77D0957'
      )
      // eslint-disable-next-line vue/no-async-in-computed-properties
      balance.then(balanceData => balanceData.json)
      // eslint-disable-next-line no-return-assign, vue/no-async-in-computed-properties
      balance.then(data => this.dxdaoSwprBal = data)
      return this.dxdaoSwprBal.result
    },
    dxdaoEnsBalance () {
      const api = require('etherscan-api').init(
        'FI9MR2BMJUNDXWVX76DT2GN3C28KRPMRFC'
      )
      const balance = api.account.tokenbalance(
        '0x519b70055af55a007110b4ff99b0ea33071c720a',
        '',
        '0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72'
      )
      // eslint-disable-next-line vue/no-async-in-computed-properties
      balance.then(balanceData => balanceData.json)
      // eslint-disable-next-line no-return-assign, vue/no-async-in-computed-properties
      balance.then(data => this.dxdaoEnsBal = data)
      return this.dxdaoEnsBal.result
    },
    dxdaoStethBalance () {
      const api = require('etherscan-api').init(
        'FI9MR2BMJUNDXWVX76DT2GN3C28KRPMRFC'
      )
      const balance = api.account.tokenbalance(
        '0x519b70055af55a007110b4ff99b0ea33071c720a',
        '',
        '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84'
      )
      // eslint-disable-next-line vue/no-async-in-computed-properties
      balance.then(balanceData => balanceData.json)
      // eslint-disable-next-line no-return-assign, vue/no-async-in-computed-properties
      balance.then(data => this.dxdaoStethBal = data)
      return this.dxdaoStethBal.result
    },
    dxdaoSusdBalance () {
      const api = require('etherscan-api').init(
        'FI9MR2BMJUNDXWVX76DT2GN3C28KRPMRFC'
      )
      const balance = api.account.tokenbalance(
        '0x519b70055af55a007110b4ff99b0ea33071c720a',
        '',
        '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51'
      )
      // eslint-disable-next-line vue/no-async-in-computed-properties
      balance.then(balanceData => balanceData.json)
      // eslint-disable-next-line no-return-assign, vue/no-async-in-computed-properties
      balance.then(data => this.dxdaoSusdBal = data)
      return this.dxdaoSusdBal.result
    },
    dxdaoRethBalance () {
      const api = require('etherscan-api').init(
        'FI9MR2BMJUNDXWVX76DT2GN3C28KRPMRFC'
      )
      const balance = api.account.tokenbalance(
        '0x519b70055af55a007110b4ff99b0ea33071c720a',
        '',
        '0xae78736Cd615f374D3085123A210448E74Fc6393'
      )
      // eslint-disable-next-line vue/no-async-in-computed-properties
      balance.then(balanceData => balanceData.json)
      // eslint-disable-next-line no-return-assign, vue/no-async-in-computed-properties
      balance.then(data => this.dxdaoRethBal = data)
      return this.dxdaoRethBal.result
    },
    allTimeHigh () {
      return this.dxd
        ? formatPrice(
          this.dxd.ath,
          this.userSelectedCurrency.format,
          this.userSelectedCurrency.id
        )
        : false
    },
    daysSinceAllTimeHigh () {
      if (this.dxd) {
        const athDate = dayjs(this.dxd.ath_date)
        return dayjs()
          .diff(athDate, 'day')
          .toLocaleString(this.userSelectedCurrency.format, {
            maximumFractionDigits: 0
          })
      }
      return false
    },
    percentageFromAllTimeHigh () {
      return this.dxd ? `${this.dxd.ath_change_percentage.toFixed(2)}%` : false
    },
    dxdCirculatingSupply () {
      if (this.dxd) {
        return this.dxd.circulating_supply.toLocaleString(
          this.userSelectedCurrency.format,
          { maximumFractionDigits: 0 }
        )
      }
      return false
    },
    lastUpdated () {
      if (this.dxd) {
        return dayjs(this.dxd.last_updated).fromNow()
      }
      return false
    }
  },
  methods: {
    formatPrice,
    isPossitive (number) {
      return number >= 0 ? 'yes' : 'no'
    },
    dxdaoEthBalance: _.debounce(
      function () {
        const api = require('etherscan-api').init(
          'FI9MR2BMJUNDXWVX76DT2GN3C28KRPMRFC'
        )
        const balance = api.account.balance(
          '0x519b70055af55a007110b4ff99b0ea33071c720a'
        )
        // eslint-disable-next-line vue/no-async-in-computed-properties
        balance.then(balanceData => balanceData.json)
        // eslint-disable-next-line no-return-assign, vue/no-async-in-computed-properties
        balance.then(data => this.dxdaoEthBal = data)
        // eslint-disable-next-line no-console
        console.log(this.eth.current_price, this.dxdaoEthBal.result)
        return ((this.dxdaoEthBal.result / 1000000000000000000) + 231 + 2499 + 62 + 993)
      }, 2000)
  }
}
</script>

<style lang="scss" scoped>
.dxd-stats {
  width: 100%;

  table {
    @apply bg-white;
    @apply shadow-sm;
    width: 100%;
    border-collapse: collapse;
    overflow: hidden;
    border-radius: 12px;

    .dark & {
      @apply bg-gray-700;
    }
  }

  thead {
    @apply text-lg;
    font-weight: bold;

    td {
      @apply text-gray-900;

      .dark & {
        @apply text-gray-400;
      }
    }

    small {
      display: inline-block;
      position: relative;
      font-size: 0.66em;
      opacity: 0.5;
      margin-left: 1em;
      margin-right: 1em;
      top: -0.25em;
    }
  }

  td {
    @apply border;
    @apply border-blue-100;
    @apply text-blue-900;
    padding: 0.5em 1em;
    font-size: 0.9em;

    .dark & {
      @apply border-gray-900;
      @apply text-gray-300;
    }

    strong {
      font-weight: normal;
      @apply text-gray-800;

      .dark & {
        @apply text-gray-400;
      }
    }
  }
}
</style>
