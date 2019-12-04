<template lang="html">
    <div class="container">
      <div class="row">
        <div class="col-md-12 mb-4">
          Username : {{ tester.username }}
        </div>
        <div class="col-md-6 mb-4">
          Age :
          <span v-if="tester.bird">
          {{ yearsOld }} years Old
          </span>
          <span v-else>
          N/A
          </span>
        </div>
        <div class="col-md-6 mb-4">
          Sex :
          <span v-if="tester.civility === 'mr'">M</span>
          <span v-if="tester.civility === 'ms'">F</span>
        </div>
        <div class="col-md-6 mb-4">
          Email :
          <a :href="'mailto:' + tester.email">
            {{ tester.email }}
          </a>
        </div>
        <div class="col-md-6 mb-4">
          Country :
          <span v-if="tester.country">
          {{ tester.country }}
          </span>
          <span v-else>
          N/A
          </span>
        </div>
        <div class="col-md-12 mb-4">
          Facebook account :
          <span v-if="tester.facebook">
          <a onclick="window.open(this.href); return false;" :href="tester.facebook">Facebook</a>
          </span>
          <span v-else>
          N/A
          </span>
        </div>
        <div v-for="marketplace in tester.marketplaces" :key="marketplace.id" class="col-md-12 mb-4">
          {{marketplace.marketplaceName}} account :
            <a onclick="window.open(this.href); return false;" :href="marketplace.marketplaceUrl">
              {{ marketplace.marketplaceName }}
            </a>
        </div>
      </div>
      <div class="row">
        <b-form-group v-if="review.comment"
                    id="fieldset1"
                    class="col-md-12"
                    label="Comment:"
                    label-for="textarea1"
                    >
          <b-form-textarea id="textarea1"
                       v-model="review.comment"
                       :rows="3"
                       :max-rows="6"
                       disabled>
         </b-form-textarea>
       </b-form-group>
       </div>
       <div class="row text-center">
         <b-button v-if="review.stage === '1_approval'" class="col-md-6" variant="success" @click.stop="acceptReview">
           Accept
         </b-button>
         <b-button v-if="review.stage === '1_approval'" class="col-md-6" variant="danger" @click.stop="declineReview">
           Decline
         </b-button>
       </div>
    </div>
</template>

<script>
export default {
  name: 'TesterProfile',
  props: {
    review: {},
    tester: {}
  },
  data () {
    return {
    }
  },
  computed: {
    yearsOld: function () {
      var today = new Date()
      var birthDate = new Date(this.tester.bird)
      var age = today.getFullYear() - birthDate.getFullYear()
      var m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      return age
    }
  },
  methods: {
    acceptReview () {
      this.$emit('accepted', this.review)
    },
    declineReview () {
      this.$emit('declined', this.review)
    }
  }
}
</script>

<style lang="css">
</style>
