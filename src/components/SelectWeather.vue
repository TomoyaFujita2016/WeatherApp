<template>
<v-container fill-height fluid class="mt-15">
  <v-row align="center"
      justify="center">
      <v-col cols=12 align="center">
          <h2 class="text-h3 mb-3 font-weight-thin">WeatherApp</h2>
      </v-col>
      <v-col cols=8 offset-cols=2 align="center">
        <div class="text-caption mb-3">WeatherAppは「東京・大阪・名古屋」の前後１週間の天気予報を<a href="https://www.metaweather.com/api/">metaweather.com</a>を使用して取得, 表示することができるウェブアプリケーションです。</div>
      </v-col>

      <v-col cols=12 align="center"> 
      </v-col>
      <v-col cols=10 sm=6 offset-cols=1 align="center" class="pb-0"> 
      <v-select
      v-model="selectedPlace"
      item-text="label"
      item-value="value"
      :items="places"
      label="地域を選択してください"
      return-object
    />
      </v-col>
      <v-col cols=12 align="center" class="pt-0"> 
        <v-btn small @click="push_place" >検索</v-btn>
      </v-col>
  </v-row>

</v-container>
</template>

<script>

  export default {
    data: () => ({
        places: [
         { value: 'tokyo'   , label: '東京'  },
         { value: 'nagoya' , label: '名古屋'    },
         { value: 'osaka' , label: '大阪'   },
        ],
        selectedPlace: { value: 'tokyo', label: '東京'  },
        
    }),
    created() {
    },
    computed:{
    },
    methods:{
        push_place(){
            console.log(this.selectedPlace.label)
            this.$router.push({name: 'WeatherList', query: {place: this.selectedPlace.label}})


        }
    }
  }
</script>
