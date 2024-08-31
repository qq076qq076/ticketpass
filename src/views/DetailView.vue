<template>
    <div class="about">
        <template v-if="isLoading">
            <LoadingIcon></LoadingIcon>
        </template>
        <template v-else-if="event">
            <img :src="event.image"
                 :alt="event.title"
                 class="w-full pb-3" />
            <h1 class="text-4xl text-center pb-3 mx-3">{{ event.title }}</h1>
            <div class="text-lg mx-7 lg:mx-4">
                <p>from {{ event.start }}</p>
                <p class="pb-3">to {{ event.end }}</p>
                <p v-html="event.description"></p>
            </div>
        </template>
        <template v-else>
            <h1 class="text-4xl text-center pb-3 mx-3">Item not found</h1>
        </template>
    </div>
</template>

<script lang="ts">
import { getEventById } from '@/api/event.services';
import type { EventItem } from '@/interface/event';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import LoadingIcon from '../components/loadingIcon.vue';

export default {
    name: 'event-detail',
    components: { LoadingIcon },
    setup(props) {
        const route = useRoute();
        const id = +route.params.id;
        const event = ref<EventItem>();
        const isLoading = ref<boolean>(true);

        onMounted(async () => {
            try {
                const result = await getEventById(id);
                event.value = result;
                var img = new Image();
                img.src = result.image;
                isLoading.value = false;
                console.log(result)
            } catch (error) {
                isLoading.value = false;
                console.log(error)
            }
        });

        return {
            event,
            isLoading,
        }
    }
};
</script>