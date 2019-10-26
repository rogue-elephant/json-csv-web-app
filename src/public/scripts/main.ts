import axios from "axios";
import Vue from "vue";

new Vue({
    el: '#app',
    data() {
        return {
            message: 'Paste JSON to Convert',
            inputJson: '',
            csv: ''
        };
    },
    methods: {
        jsonToCsv() {
            const inputJson = JSON.parse(this.inputJson);
            axios.post('/api/jsontocsv', inputJson)
            .then((response) => {
                this.csv = response.data.result;
                this.message = 'JSON converted';
            })
            .catch((error: any) => {
                // tslint:disable-next-line:no-console
                console.log(error);

                this.message = error;
            })
        }
    }
})