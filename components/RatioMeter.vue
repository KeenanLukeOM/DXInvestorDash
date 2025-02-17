<template>
  <div
    v-show="displayMeter"
    v-observe.once.-100px="setAnimate"
    :data-animate="animate"
    :data-drag="useDragProgress"
    :data-interactive="interactive"
    :data-adjusting-ratio="adjustingRatio"
    class="text-center flex flex-col flex-1 w-full pt-24 md:pt-32 pb-16 md:pb-24 max-w-screen-sm m-auto"
  >
    <div class="meter-wrapper">
      <div class="controls text-gray-400 dark:text-gray-600">
        <IconCaretUp
          v-show="max < 1"
          class="caret-up hover:text-gray-500 hover:dark:text-gray-700"
          @click.native.stop="increaseMaxRatio"
        />
        <IconCaretDown
          v-show="max > 0.1"
          class="caret-down hover:text-gray-500 hover:dark:text-gray-700"
          @click.native.stop="decreaseMaxRatio"
        />
      </div>
      <div
        :data-user-drag="useDragProgress || max !== 0.2"
        class="ratio-meter bg-blue-200 bg-opacity-50 dark:bg-opacity-100 min-w-full m-auto p-4 rounded-full border-2 border-blue-200 dark:border-gray-500 dark:bg-gray-700"
      >
        <div class="labels text-center">
          <span
            class="badge current font-bold dark:text-gray-300"
            :style="{
              left: `${calculatedPercent}%`,
            }"
          >
            <span class="number">
              {{ calculatedRatio }}
            </span>
            <span class="font-normal text-xs text-gray-700 dark:text-gray-400">
              <span class="monospace">({{ calculatedDollars }})</span>
            </span>
            <span
              v-if="useDragProgress || max !== 0.2"
              class="reset-button bg-green-300 leading-none py-2 px-3 mt-1 text-xs rounded-md dark:bg-green-600"
              @click.prevent.stop="resetDrag"
            >
              Reset Meter
            </span>
            <span
              v-else
              class="badge-label"
            >
              We’re here.
            </span>
          </span>
          <transition name="fade">
            <span
              v-if="max < 0.4"
              class="badge death-of-eth-party font-bold dark:text-gray-300"
              :data-passed="ratio >= deathOfEth"
              :style="{
                left: `${deathOfEthPercent}%`,
              }"
            >
              <span class="number">
                {{ deathOfEth }}
              </span>
              <span class="font-normal text-xs text-gray-700 dark:text-gray-400">
                <span class="monospace">({{ deathOfEthDollars }})</span>
              </span>
              <span class="leading-tight">
                <a href="https://twitter.com/LUKACACIC/status/1377371626656952326" target="_blank" rel="noopener">
                  Death of ETH&nbsp;Party
                </a>
              </span>
              <span class="text-4xl leading-none mt-2 font-normal">🎉</span>
            </span>
          </transition>
          <transition name="fade">
            <span
              v-show="max <= 0.2"
              class="badge deserved dark:text-gray-300"
              :data-passed="ratio >= deserved"
              :style="{
                left: `${deservedPercent}%`,
              }"
            >
              <span class="number">
                {{ deserved }}
              </span>
              <span class="font-normal text-xs text-gray-700 dark:text-gray-400">
                <span class="monospace">({{ deservedDollars }})</span>
              </span>
              <span class="leading-tight tracking-tight badge-label">Flippty&nbsp;Percent</span>
              <span class="text-3xl leading-none mt-2 font-normal">🦐</span>
            </span>
          </transition>
          <transition name="fade">
            <span
              v-show="max >= 0.2"
              class="badge target dark:text-gray-300"
              :data-passed="ratio >= flippening"
              :style="{
                left: `${targetPercent}%`,
              }"
            >
              <span class="number">
                {{ flippening }}
              </span>
              <span class="font-normal text-xs text-gray-700 dark:text-gray-400">
                <span class="monospace">({{ targetDollars }})</span>
              </span>
              <span class="leading-tight tracking-tight badge-label">The&nbsp;Flippening</span>
              <span class="text-3xl leading-none mt-2">🐬</span>
            </span>
          </transition>
          <transition name="fade">
            <span
              v-show="max >= 0.4"
              class="badge target dark:text-gray-300"
              :data-passed="ratio >= (flippening * 2).toFixed(5)"
              :style="{
                left: `${targetPercent2x}%`,
              }"
            >
              <span class="number">
                {{ (flippening * 2).toFixed(5) }}
              </span>
              <span class="font-normal text-xs text-gray-700 dark:text-gray-400">
                <span class="monospace">({{ targetDollars2x }})</span>
              </span>
              <span class="leading-tight tracking-tight badge-label">The Double&nbsp;Dolph</span>
              <span class="text-3xl leading-none mt-2">🐬🐬</span>
            </span>
          </transition>
          <transition name="fade">
            <span
              v-show="max >= 0.6"
              class="badge target dark:text-gray-300"
              :data-passed="ratio >= (flippening * 3).toFixed(5)"
              :style="{
                left: `${targetPercent3x}%`,
              }"
            >
              <span class="number">
                {{ (flippening * 3).toFixed(5) }}
              </span>
              <span class="font-normal text-xs text-gray-700 dark:text-gray-400">
                <span class="monospace">({{ targetDollars3x }})</span>
              </span>
              <span class="leading-tight tracking-tight badge-label">The Trip&nbsp;Flip</span>
              <span class="text-2xl leading-none mt-2">🐬🐬🐬</span>
            </span>
          </transition>
          <transition name="fade">
            <span
              v-show="max >= 0.8"
              class="badge target dark:text-gray-300"
              :data-passed="ratio >= (flippening * 4).toFixed(5)"
              :style="{
                left: `${targetPercent4x}%`,
              }"
            >
              <span class="number">
                {{ (flippening * 4).toFixed(5) }}
              </span>
              <span class="font-normal text-xs text-gray-700 dark:text-gray-400">
                <span class="monospace">({{ targetDollars4x }})</span>
              </span>
              <span class="leading-tight tracking-tight badge-label">The Quad&nbsp;Pod</span>
              <span class="text-2xl leading-none mt-2">🐬🐬<br>🐬🐬</span>
            </span>
          </transition>
          <span class="maximum text-gray-700 dark:text-gray-500">
            {{ max }}
          </span>
        </div>
        <div
          ref="progress"
          class="progress rounded-full"
          :style="{
            maxWidth: `${calculatedPercent}%`,
          }"
        >
          <div class="percent font-bold text-xs text-red-800 dark:text-red-200">
            {{ calculatedRatioPercent }}%
          </div>
          <div
            v-touch:start="mousedownHandler"
            v-touch:end="mouseupHandler"
            v-touch:moving="mousemoveHandler"
            class="control"
            @mousedown.stop="mousedownHandler"
            @mouseover.stop="mouseoverHandler"
            @mousemove.stop="mousemoveHandler"
            @mouseup.stop="mouseupHandler"
            @mouseout.stop="mouseoutHandler"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatPrice } from '~/libs/utils'

export default {
  data () {
    return {
      animate: 'none',
      interactive: false,
      max: 0.2,
      isMouseDownOnBall: false,
      isMouseDownOnBody: false,
      outProgressClientX: 0,
      useDragProgress: false,
      previousDragWidthPercent: 0,
      dragWidthPercent: 0,
      adjustingRatio: false,
      deathOfEth: 0.03,
      activeConfetti: false,
      confettiHasFired: false
    }
  },
  computed: {
    ...mapGetters({
      userSelectedCurrency: 'markets/userSelectedCurrency',
      coinGecko: 'markets/coinGecko',
      eth: 'markets/eth',
      dxd: 'markets/dxd',
      ratio: 'markets/ratio',
      ratioDollars: 'markets/ratioDollars',
      ratioPercent: 'markets/ratioPercent',
      flippening: 'markets/flippening',
      deserved: 'markets/deserved',
      deservedDollars: 'markets/deservedDollars',
      targetDollars: 'markets/targetDollars',
      targetDollars2x: 'markets/targetDollars2x',
      targetDollars3x: 'markets/targetDollars3x',
      targetDollars4x: 'markets/targetDollars4x',
      confetti: 'system/confetti',
      wsPriceFeed: 'system/webSocketPriceFeed',
      fallbackPriceFeed: 'system/fallbackPriceFeed'
    }),
    displayMeter () {
      return this.wsPriceFeed || this.fallbackPriceFeed
    },
    calculatedPercent () {
      return this.useDragProgress ? this.dragWidthPercent : this.progressPercent
    },
    calculatedRatioPercent () {
      if (this.useDragProgress) {
        return ((this.dragWidthPercent / this.targetPercent) * 100).toFixed(2)
      }
      return this.ratioPercent
    },
    progressPercent () {
      if (this.ratio) {
        return (this.ratio / this.max) * 100
      }
      return 0
    },
    deservedPercent () {
      if (this.max) {
        return (this.deserved / this.max) * 100
      }
      return 0
    },
    deathOfEthPercent () {
      if (this.max) {
        return (this.deathOfEth / this.max) * 100
      }
      return 0
    },
    deathOfEthDollars () {
      if (this.eth) {
        return formatPrice(
          ((this.deathOfEth / this.ratio) * this.eth.current_price),
          this.userSelectedCurrency.format,
          this.userSelectedCurrency.id
        )
      }
      return 0
    },
    targetPercent () {
      if (this.flippening) {
        return (this.flippening / this.max) * 100
      }
      return 0
    },
    targetPercent2x () {
      if (this.flippening) {
        return ((this.flippening * 2) / this.max) * 100
      }
      return 0
    },
    targetPercent3x () {
      if (this.flippening) {
        return ((this.flippening * 3) / this.max) * 100
      }
      return 0
    },
    targetPercent4x () {
      if (this.flippening) {
        return ((this.flippening * 4) / this.max) * 100
      }
      return 0
    },
    calculatedRatio () {
      if (this.useDragProgress) {
        return ((this.dragWidthPercent * this.max) / 100).toFixed(6)
      }
      return this.ratio
    },
    calculatedDollars () {
      if (this.useDragProgress) {
        return this.formatPrice(
          ((this.dragWidthPercent * this.max) / 100) * this.dxd.current_price,
          this.userSelectedCurrency.format,
          this.userSelectedCurrency.id
        )
      }
      return this.ratioDollars
    }
  },
  watch: {
    calculatedDollars () {
      this.updateTitle()
    },
    ratio () {
      if ((this.ratio >= this.deserved && this.ratio < 0.0825) && !this.activeConfetti && !this.confettiHasFired) {
        this.activeConfetti = true
        this.confettiHasFired = true
        this.$confetti.start({
          defaultType: 'image',
          defaultSize: 8,
          defaultDropRate: 8,
          particlesPerFrame: 1,
          particles: [
            {
              size: 4,
              dropRate: 7,
              type: 'circle'
            },
            {
              size: 8,
              dropRate: 8,
              type: 'rect'
            },
            {
              size: 16,
              dropRate: 9,
              type: 'rect'
            }
          ]
        })

        setTimeout(() => {
          this.activeConfetti = false
          this.$store.commit('system/setConfetti', false)
          this.$confetti.stop()
        }, 15000)
      }
    }
  },
  mounted () {
    this.dragWidthPercent = this.progressPercent

    if (this.$route.query.max) {
      const paramMax = Math.max(0, Math.min(1, parseFloat(this.$route.query.max))).toFixed(1)
      this.max = parseFloat(paramMax)
    }
    if (this.$route.query.ratio) {
      const paramRatio = Math.max(0, Math.min(this.max, parseFloat(this.$route.query.ratio))).toFixed(6)
      this.dragWidthPercent = (paramRatio / this.max) * 100
      this.useDragProgress = true
    }

    setTimeout(() => {
      this.interactive = true
    }, 1000)
  },
  methods: {
    formatPrice,
    updateTitle () {
      if (process.client && this.ratio && this.eth) {
        const price = this.formatPrice(
          this.eth.current_price,
          this.userSelectedCurrency.format,
          this.userSelectedCurrency.id
        )
        const title = this.$nuxt.context.env.head.title
        document.title = `(${this.ratio}) ${price} - ${title}`
      }
    },
    setAnimate () {
      this.animate = true
    },
    mousedownHandler (e) {
      if (e.which === 1 || e.type === 'touchstart') {
        this.isMouseDownOnBall = true
        this.useDragProgress = true
      }
    },
    mousemoveHandler (e) {
      const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX
      if (this.isMouseDownOnBall && this.useDragProgress) {
        const decimal =
          (clientX - this.$el.offsetLeft) / this.$el.clientWidth
        const percent = decimal * 100
        if (percent > 100) {
          this.dragWidthPercent = 100
        } else if (percent < 0) {
          this.dragWidthPercent = 0
        } else {
          this.dragWidthPercent = percent
        }
      }
    },
    mouseupHandler (e) {
      if (this.isMouseDownOnBall && this.useDragProgress) {
        const clientX = e.type === 'touchend' ? false : e.clientX
        const decimal = clientX
          ? (clientX - this.$el.offsetLeft) / this.$el.clientWidth
          : this.dragWidthPercent / 100
        const percent = decimal * 100
        this.dragWidthPercent = percent
        this.isMouseDownOnBall = false
        this.$router.replace({
          path: this.$route.path,
          query: {
            ...this.$route.query,
            ratio: this.calculatedRatio
          }
        })
      }
    },
    mouseoverHandler (e) {
      if (e.which === 0) {
        this.isMouseDownOnBall = false
      }
    },
    mouseoutHandler (e) {
      if (e.which === 1 && this.useDragProgress) {
        this.outProgressClientX = e.clientX
        this.isMouseDownOnBody = true
        this.bodyEventHandler()
      }
    },
    bodyEventHandler () {
      const body = document.getElementsByTagName('body')[0]
      body.addEventListener('mousemove', this.bodyMousemoveHandler)
      body.addEventListener('mouseup', (e) => {
        this.isMouseDownOnBall = false
        this.isMouseDownOnBody = false
        this.outProgressClientX = 0
        body.removeEventListener('mousemove', this.bodyMousemoveHandler)
      })
    },
    bodyMousemoveHandler (e) {
      e.preventDefault()
      if (e.which === 1 && this.isMouseDownOnBody === true) {
        const offsetX = e.clientX - this.outProgressClientX
        if (offsetX > 0) {
          if (e.clientX < this.$el.clientWidth + this.$el.offsetLeft) {
            const decimal = (e.clientX - this.$el.offsetLeft) / this.$el.clientWidth
            const percent = decimal * 100
            this.dragWidthPercent = Math.min(percent, 100)
          } else {
            this.dragWidthPercent = 100
          }
        } else if (offsetX < 0) {
          if (e.clientX > this.$el.offsetLeft) {
            const decimal = (e.clientX - this.$el.offsetLeft) / this.$el.clientWidth
            const percent = decimal * 100
            this.dragWidthPercent = Math.max(percent, 0)
          } else {
            this.dragWidthPercent = 0
          }
        }
      }
    },
    resetDrag () {
      this.useDragProgress = false
      this.isMouseDownOnBall = false
      this.isMouseDownOnBody = false
      this.outProgressClientX = 0
      this.max = 0.2
      this.dragWidthPercent = this.progressPercent
      this.$router.replace({
        path: this.$route.path,
        query: {}
      })
    },
    increaseMaxRatio () {
      this.adjustingRatio = true
      setTimeout(() => {
        const oldMax = this.max
        this.max = parseFloat(Math.min(this.max + 0.1, 1.0).toFixed(1))
        this.dragWidthPercent = Math.max(this.dragWidthPercent * (oldMax / this.max), 0)
        this.updateRatioMaxParam()
      }, 10)
    },
    decreaseMaxRatio () {
      this.adjustingRatio = true
      setTimeout(() => {
        const oldMax = this.max
        this.previousDragWidthPercent = this.dragWidthPercent
        this.max = parseFloat(Math.max(this.max - 0.1, 0.1).toFixed(1))
        this.dragWidthPercent = Math.min(this.dragWidthPercent * (oldMax / this.max), 100)
        this.updateRatioMaxParam()
      }, 10)
    },
    updateRatioMaxParam () {
      this.$router.replace({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          max: this.max
        }
      })
      setTimeout(() => {
        this.adjustingRatio = false
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .75s, left 0s 1s !important;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0 !important;
}

.meter-wrapper {
  position: relative;
}

.ratio-meter {
  position: relative;
  user-select: none;
  -webkit-touch-callout: none;

  &[data-user-drag="true"] .labels > span.current {
    @apply bg-green-200;
    @apply dark:bg-green-800;

    &:after {
      @apply text-green-200;
      @apply dark:text-green-800;
    }
  }

  .labels {
    pointer-events: none;

    .reset-button,
    .death-of-eth-party {
      pointer-events: all;
    }
  }

  .labels > span {
    position: absolute;

    &.badge {
      @apply bg-blue-100;
      @apply dark:bg-gray-700;
      border: 1px solid rgb(201, 216, 238);
      border-radius: 5px;
      display: block;
      padding: 0.5em;
      width: 110px;

      .dark & {
        border: 1px solid rgb(31, 41, 55);
      }

      &[data-passed="true"] {
        @apply bg-green-200;
        @apply dark:bg-green-800;
      }

      span {
        display: block;
      }

      .number {
        font-size: 1rem;
        font-weight: normal;
        letter-spacing: 0.025em;
      }

      .badge-label {
        font-size: 0.85em;

        @media (min-width: 500px) {
          font-size: 0.9em;
        }
      }
    }

    &.current {
      @apply bg-blue-200;
      @apply dark:bg-gray-600;
      bottom: calc(100% + 1em);
      transform: translateX(-50%);
      white-space: nowrap;

      &:after {
        @apply text-blue-200;
        @apply dark:text-gray-600;
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        width: 0;
        height: 0;
        transform: translateX(-50%);
        border: 10px solid transparent;
        border-top-color: currentColor;
      }
    }

    &.target,
    &.deserved,
    &.death-of-eth-party {
      top: calc(100% + 1em);
      transform: translateX(-50%);

      &[data-passed="true"] {
        &:after {
          @apply text-green-200;
          @apply dark:text-green-800;
        }
      }

      &:after {
        @apply text-blue-100;
        @apply dark:text-gray-700;
        content: "";
        position: absolute;
        bottom: 100%;
        left: 50%;
        width: 0;
        height: 0;
        transform: translateX(-50%);
        border: 10px solid transparent;
        border-bottom-color: currentColor;
      }
    }

    // badge animations
    &.badge {
      transition: left 1s 0.1s ease-out, opacity 0.5s 0.5s ease-in-out;
      opacity: 1;

      [data-animate="none"] & {
        left: 0 !important;
        opacity: 0;
      }

      &.current {
        [data-drag="true"] & {
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
        [data-adjusting-ratio="true"] & {
          transition-duration: 0.33s !important;
          transition-delay: 0s !important;
        }
      }
    }

    &.death-of-eth-party {
      padding-left: 0.5em;
      padding-right: 0.5em;

      a {
        display: block;
        font-size: 0.75rem !important;
        line-height: 1.1;
        text-decoration: underline;

        @media (min-width: 768px) {
          line-height: inherit;
        }
      }
      .leading-none {
        font-size: 1.66em;
      }
    }

    &.deserved {
      transform: translateX(calc(-50% + 24px));

      &::after {
        transform: translateX(calc(-50% - 24px));
      }

      @media (min-width: 768px) {
        transform: translateX(calc(-50% + 15px));

        &::after {
          transform: translateX(calc(-50% - 15px));
        }
      }
    }

    &.target,
    &.deserved,
    &.death-of-eth-party {
      transition: opacity 0.5s 0.5s ease-in-out;
      opacity: 1;

      [data-animate="none"] & {
        opacity: 0;
      }
      [data-interactive="true"] & {
        transition: opacity 0.5s 0.5s ease-in-out, left 0.33s 0s ease-out;
      }
    }
  }

  .minimum {
    z-index: 2;
    left: 1em;
    top: 50%;
    transform: translateY(-50%);
  }
  .maximum {
    z-index: 1;
    right: 1em;
    top: 50%;
    transform: translateY(-50%);
  }
}

.controls {
  position: absolute;
  right: 0;
  top: 0;
  width: 1px;
  height: 100%;

  .caret-up,
  .caret-down {
    position: absolute;
    right: 1.25em;
    width: 1em;
    height: 1em;
    cursor: pointer;
    user-select: none;

    @media (min-width: 500px) {
      right: 1em;
      width: 1.25em;
      height: 1.25em;
    }
  }

  .caret-up {
    bottom: 100%;

    @media (min-width: 500px) {
      bottom: calc(100% + 0.15em);
    }
  }
  .caret-down {
    top: 100%;

    @media (min-width: 500px) {
      top: calc(100% + 0.15em);
    }
  }
}

.progress {
  @apply bg-gradient-to-r;
  @apply from-red-500;
  @apply to-red-400;
  box-sizing: content-box;
  position: absolute;
  top: 0.25em;
  bottom: 0.25em;
  left: 0.25em;
  width: calc(100% - 1em);
  min-width: 1em;
  padding-right: 0.5em;
  z-index: 2;
  overflow: hidden;
  transition: max-width 1s 0.1s ease-out;

  [data-animate="none"] & {
    max-width: 0 !important;
  }
  [data-drag="true"] & {
    transition-duration: 0s !important;
    transition-delay: 0s !important;
  }
  [data-adjusting-ratio="true"] & {
    transition-duration: 0.33s !important;
    transition-delay: 0s !important;
  }

  .percent {
    -webkit-font-smoothing: antialiased;
    position: absolute;
    top: 50%;
    right: 2em;
    transform: translateY(-50%);
    transition: opacity 1s ease-out;

    [data-animate="none"] & {
      opacity: 0 !important;
    }
  }

  .control {
    position: absolute;
    width: 1em;
    height: 1em;
    top: 50%;
    right: 0.25em;
    transform: translateY(-50%);
    border-radius: 50%;
    background-color: #fff;
    opacity: 0.66;
    cursor: grab;
  }
}
</style>
