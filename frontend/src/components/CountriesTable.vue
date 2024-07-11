<template>
    <div>
        <b-field label="Search">
            <b-input v-model="searchText" placeholder="Search country by name" @input="onSearch" @keyup.native.enter="onSearch"></b-input>
        </b-field>
        <b-field label="Select region" @input="onSelectRegion">
            <b-select v-model="region" placeholder="Select a region">
                <option
                    v-for="region in regions"
                    :value="region"
                    :key="region">
                    {{ region.charAt(0).toUpperCase() + region.slice(1) }}
                </option>
            </b-select>
        </b-field>
        <b-table
            :data="data"
            :loading="loading"
            :striped="true"
            :hoverable="true"
            paginated
            backend-pagination
            :total="total"
            :isPaginationSimple="isPaginationSimple"
            :per-page="perPage"
            :current-page="currentPage"
            :pagination-position="paginationPosition"
            @page-change="onPageChange"
            
            :sort-icon="sortIcon"
            :sort-icon-size="sortIconSize"

            backend-sorting
            :default-sort-direction="defaultSortDirection"
            :default-sort="[sortField, sortOrder]"
            @sort="onSort"

            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
            >
            <b-table-column field="cca2" label="cca2 Id" width="100" sortable v-slot="props">
                {{ props.row.cca2 }}
            </b-table-column>
            <b-table-column field="name" label="Name" width="150" sortable v-slot="props">
                {{ props.row.name }}
            </b-table-column>
            <b-table-column field="population" label="Population" sortable numeric v-slot="props">
                {{ props.row.population }}
            </b-table-column>
            <b-table-column field="capital" label="Capital" sortable v-slot="props">
                {{ props.row.capital != "" ? props.row.capital : "Country without capital" }}
            </b-table-column>
            <b-table-column field="region" label="Region" sortable v-slot="props">
                {{ props.row.region }}
            </b-table-column>
            <b-table-column field="flag" label="Flag" v-slot="props">
                <b-image :src="props.row.flag" ratio="3by2"></b-image>
            </b-table-column>
        </b-table>
    </div>
</template>
  
<script lang="ts">
import axios from 'axios';
import * as _ from 'lodash';

export default {
    data(){
        return{
            data:[],
            loading: false,
            paginated: true,
            isPaginationSimple: false,
            paginationPosition: "bottom",
            defaultSortDirection: "desc",
            defaultSort: "population",
            sortIcon: 'arrow-up',
            sortIconSize: 'is-small',
            sortField: 'population',
            sortOrder: 'desc',
            total: 0,
            currentPage: 1,
            perPage: 10,
            searchText: '',
            regions: ["all", "africa", "americas", "antarctic", "asia", "europe", "oceania"],
            region:'all',
            baseUrl: import.meta.env.VUE_APP_API_URL || 'http://localhost:3000/api',
            url: '/countries/all'
        };
    },
    created(){
        this.fetchData();
    },
    mounted(){
        if(this.region=='all') {
            this.fetchData()
        } else {
            this.onSelectRegion()
        }
    },
    methods:{
        fetchData: _.debounce(async function(this:any) {
            try {
                this.loading = true;
                const response = await axios.get(`${this.baseUrl+this.url}`, {
                    params: {
                        page: this.currentPage,
                        sort_field: this.sortField,
                        sort_order: this.sortOrder,
                        search: this.searchText,
                    },
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
                this.data = response.data.data;
                this.currentPage = response.data.page;
                this.perPage = response.data.items_per_page;
                this.total = response.data.total_items;
            } catch (err) {
                console.log({"error": err});
            } finally {
                this.loading = false;
            }
        }, 150),
        onPageChange: _.debounce(function(this:any, page: number) {
            this.currentPage = page;
            this.fetchData();
        }, 0),
        onSort: _.debounce(function(this:any, field:string, order:string) {
            this.sortField = field
            this.sortOrder = order
            this.fetchData()
        }, 0),
        onSearch: _.debounce(function(this:any) {
            this.fetchData()
        }, 0),
        onSelectRegion: _.debounce(function(this:any) {
            if(this.region == "all" || this.region == ""|| this.region == undefined) {
                this.url= "/countries/all"
            } else {
                this.url =`/countries/region/${this.region}` 
            }
            this.fetchData()
        }, 0),
    },
};
</script>