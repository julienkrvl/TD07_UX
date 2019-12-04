<template lang="html">
    <div>
      <b-form-select v-model="selected" :options="options" class="mb-3" />
      <b-input-group v-if="selected === 'other'" size="md" prepend="Marketplace:" class="mb-3">
        <b-form-input v-model="marketplaceName" placeholder="Name of the marketplace"></b-form-input>
      </b-input-group>
      <b-input-group size="md" prepend="Link:">
        <b-form-input v-model="marketplaceUrl" placeholder="https://www.amazon.fr/gp/profile/YourAccount"></b-form-input>
      </b-input-group>
      <b-button v-if="marketplaceUrl !== ''" @click="addMarketplace" class="mt-3" variant="success">Add</b-button>
    </div>
</template>

<script>
import MarketplaceService from '@/services/MarketplaceService'
export default {
  name: 'AddMarketplace',
  data () {
    return {
      selected: null,
      marketplaceName: null,
      marketplaceUrl: '',
      options: [
        { value: null, text: 'Please select an Marketplace', disabled: true },
        { value: 'Amazon', text: 'Amazon' },
        { value: 'Cdiscount', text: 'Cdiscount' },
        { value: 'Ebay', text: 'Ebay' },
        { value: 'other', text: 'Other' }
      ]
    }
  },
  methods: {
    async addMarketplace () {
      let marketplace
      if (this.selected !== 'other') {
        marketplace = this.selected
      } else {
        marketplace = this.marketplaceName
      }
      let response = await MarketplaceService.addMarketplace({
        marketplace: marketplace,
        marketplaceUrl: this.marketplaceUrl
      })
      let value = { _id: response.data.marketplaceId, marketplaceName: marketplace, marketplaceUrl: this.marketplaceUrl }
      this.reset()
      this.$emit('childToParent', value)
    },
    reset () {
      this.selected = null
      this.marketplaceName = null
      this.marketplaceUrl = ''
    }
  }
}
</script>

<style lang="css">
</style>
