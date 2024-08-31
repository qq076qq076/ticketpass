<template>
    <div class="rounded-lg overflow-hidden shadow-lg hover:shadow-gray-400">
        <img :src="image"
             :alt="title" />
        <div class="bg-white text-slate-900 p-3">
            <h2 class="text-xl font-bold truncate"
                :title="title">{{ title }}</h2>
            <p class="text-base">from {{ start }}</p>
            <p class="text-base">to {{ end }}</p>
            <div class="w-full flex items-center justify-center mt-2">
                <router-link :to="'/' + id"
                             class="rounded-full w-3/5 bg-[#34CB98] text-gray-50 font-bold py-2 shadow hover:shadow-inner flex items-center justify-center">View</router-link>
            </div>
        </div>
    </div>
</template>

<script type="module" lang="ts">
export default {
    name: 'event-item-view',
    props: {
        id: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        start: {
            type: String,
            required: true,
        },
        end: {
            type: String,
            required: true,
        },
    }
}
</script>