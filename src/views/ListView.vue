<template>
    <div class="m-auto max-w-screen-lg px-4 p-0 pt-4">
        <template v-if="isLoading">
            <LoadingIcon></LoadingIcon>
        </template>
        <template v-if="eventList.length">
            <div class="event-list grid lg:grid-cols-4 md:grid-cols-2  gap-2.5">
                <EventItemView v-for="(event, index) in eventList"
                               :key="index"
                               :id="event.id"
                               :image="event.image"
                               :title="event.title"
                               :start="event.start"
                               :end="event.end" />
            </div>
            <div class="w-full flex justify-center py-6"
                 v-if="currentPage !== totalPage">
                <button class="rounded-full w-2/5 bg-[#34CB98] text-gray-50 font-bold py-2 shadow hover:shadow-inner"
                        :class="{ 'cursor-progress opacity-50': isLoadingMore }"
                        @click="!isLoadingMore && getData(currentPage + 1)">
                    load more
                </button>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import EventItemView from '../components/EventItemView.vue';
import { getEventList } from '../api/event.services';
import type { EventItem, Pagination } from '@/interface/event';
import LoadingIcon from '../components/loadingIcon.vue';

export default defineComponent({
    name: 'EventList',
    components: {
        EventItemView,
        LoadingIcon,
    },
    setup() {
        const eventList = ref<EventItem[]>([]);
        const currentPage = ref<number>(1);
        const totalPage = ref<number>(0);
        const isLoading = ref<boolean>(true);
        const isLoadingMore = ref<boolean>(false);

        const getData = async (page: number, size = 8) => {
            try {
                isLoadingMore.value = true;
                const result: Pagination<EventItem> = await getEventList(page, size);
                result.contentList.forEach((event) => {
                    var img = new Image();
                    img.src = event.image;
                });
                currentPage.value = result.page;
                totalPage.value = result.totalPages;
                eventList.value = eventList.value.concat(result.contentList);
                isLoadingMore.value = false;
            } catch (error) {
                eventList.value = [];
                currentPage.value = 0;
                totalPage.value = 0;
            }
        };

        onMounted(async () => {
            await getData(currentPage.value, 8);
            isLoading.value = false;
        });

        return {
            eventList,
            getData, // Expose getData to be accessible in the template
            currentPage,
            totalPage,
            isLoading,
            isLoadingMore,
        };
    }
});
</script>