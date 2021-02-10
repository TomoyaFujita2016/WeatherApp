<template>
<v-container fill-height fluid class="mt-15">
  <v-row align="center"
      justify="center">
      <v-col cols=12 align="center">
          <h4 class="text-h4 mb-3 font-weight-thin">{{this.place}}の天気</h4>
      </v-col>
          <v-col cols=12 align="center">
      <v-card outlined class="mx-16 py-3 rounded-xl">

          <h4 class="text-caption px-5 font-weight-thin">天気が取得できない場合は<a href="https://cors-anywhere.herokuapp.com/corsdemo" target="_blank">こちら</a>のページで<b>『Request temporary access to the demo server」</b>と記載されているボタンを押してページを更新してください</h4>
          </v-card>
      </v-col>
       <v-row align="center" class="px-7">
       <v-col align="center" cols=2 v-for="info of infos" v-bind:key="info.date">
        <p>{{ info.date }}</p>
        <p>{{ info.max_temp | roundUp }}°C</p>
        <p>{{ info.wind }}</p>
        <p>{{ info.weather_state }}</p>
        <img v-bind:src="info.image_url" />
      </v-col>
    </v-row>
      <v-col cols=12 align="center" class="pt-0"> 
        <v-btn small @click="push_home" >ホームに戻る</v-btn>
      </v-col>
  </v-row>
<v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
</v-container>
</template>

<script>
  import axios from 'axios'
  import Vue from 'vue'
import AxiosPlugin from 'vue-axios-cors';

Vue.use(AxiosPlugin)
  export default {
    data: () => ({
        place: undefined,
        place_id: null,
        overlay: false,
        infos: [],
        place_ids: [
            {value: "東京", "id": "1118370"},
            {value: "大阪", "id": "15015370"},
            {value: "名古屋", "id": "1117817"},
        ],
        api: axios.create({
            baseURL: "https://www.metaweather.com",
        }),
        
    }),
    computed:{
        //get_weather()
    },
    methods:{
        push_home(){
            this.$router.push({name: 'Home'})
        },
        get_weather(){
            console.log("Getting W")
            this.overlay = true
            this.$axios.get(
              "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/" +
              this.place_id,
            )
            .then(
              function (response) {
                this.infos = response.data.consolidated_weather.map((weather) => {
                  return {
                    date: weather.applicable_date, //日付
                    max_temp: weather.max_temp, //最高気温
                    wind: weather.wind_direction_compass, //風向き
                    weather_state: weather.weather_state_name, //天候
                    image_url:
                      "https://www.metaweather.com/static/img/weather/ico/" +
                      weather.weather_state_abbr +
                      ".ico", //最高気温
                  };
                });

                console.log(this.infos)
                this.overlay = false
              }.bind(this)
            )
            .catch(function (error) {
              console.log(error);
                this.overlay = false
            });
        }
    },
    filters: {
    roundUp(value) {
      return Math.ceil(value);
    },
  },
    created() {
        this.place = this.$route.query.place
        this.place_id = this.place_ids.filter(place_ids => place_ids.value === this.place)[0].id
        this.get_weather()
        console.log(this.place)
        console.log(this.place_ids.filter(place_ids => place_ids.value === this.place)[0].id)
    },
  }
</script>
