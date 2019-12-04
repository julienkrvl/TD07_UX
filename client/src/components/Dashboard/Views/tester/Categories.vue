<template lang="html">
  <b-container>
  <b-row>
    <div class="col-md-4 col-sm-6 mb-4" v-for="image in images" :key="image.id">
      <router-link v-bind:to="{ name: 'Products', params: { categorie: image.slug } }">
        <b-card :title="image.title"
                :img-src="image.src"
                :img-alt="image.alt"
                img-top
                style="max-width: 20rem;"
                class="mb-2">
        </b-card>
      </router-link>
    </div>
  </b-row>
</b-container>
</template>

<script>
export default {
  name: 'Categories',
  data () {
    return {
      images: [
        { title: 'High-Tech & Electronics', src: '/static/img/categories/high-tech.jpg', alt: 'high-tech', slug: 'high-tech' },
        { title: 'Phones & Accessories', src: '/static/img/categories/phones.jpg', alt: 'phones', slug: 'phones' },
        { title: 'Camera & Photo', src: '/static/img/categories/camera_photo.jpg', alt: 'camera_photo', slug: 'camera-photo' },
        { title: 'Video Games', src: '/static/img/categories/video_games.jpg', alt: 'video_games', slug: 'video-games' },
        { title: 'Beauty & Accessories', src: '/static/img/categories/beauty-products.jpg', alt: 'beauty-products', slug: 'beauty-products' },
        { title: 'Health & Personal Care', src: '/static/img/categories/health_personal_care.jpg', alt: 'health', slug: 'health' },
        { title: 'Home & Garden', src: '/static/img/categories/home_garden.jpg', alt: 'home-garden', slug: 'home-garden' },
        { title: 'Books', src: '/static/img/categories/books.jpg', alt: 'books', slug: 'books' },
        { title: 'Clothing & Accessories', src: '/static/img/categories/clothing.jpg', alt: 'clothing', slug: 'clothing' },
        { title: 'Travel Accessories', src: '/static/img/categories/travel_accessories.jpg', alt: 'travel_accessories', slug: 'travel-accessories' },
        { title: 'Music & Accessories', src: '/static/img/categories/music.jpg', alt: 'music', slug: 'music' },
        { title: 'Art', src: '/static/img/categories/art.jpg', alt: 'art', slug: 'art' },
        { title: 'Jewelry', src: '/static/img/categories/jewelry.jpg', alt: 'jewelry', slug: 'jewelry' },
        { title: 'Baby Products', src: '/static/img/categories/baby_products.jpg', alt: 'baby_products', slug: 'baby-products' },
        { title: 'Toys & Games', src: '/static/img/categories/toys_games.jpg', alt: 'toys_games', slug: 'toys-games' },
        { title: 'Sport & Accessories', src: '/static/img/categories/sport.jpg', alt: 'sport', slug: 'sport' },
        { title: 'Automotive & Powersports', src: '/static/img/categories/automotive.jpg', alt: 'automotive', slug: 'automotive' }
      ]
    }
  }
}
</script>

<style lang="css">
</style>
