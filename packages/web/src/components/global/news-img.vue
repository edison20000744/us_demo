<!-- 圖片從其他網站獲取會隨機顯示「此圖片未經允許不可使用」，這個component判斷如果獲取的圖片是正方形即為該段文字，不做顯示 -->

<template>
	<img ref="img" :src="src" v-if="src && (!loaded || valid)" v-show="loaded && valid" />
	<img v-else src="./assets/default_news.svg" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const props = defineProps<{ src?: string }>();
const img = ref<HTMLImageElement>();
const loaded = ref(false);
const valid = ref(false);

onMounted(() => {
	if (props.src != '' && img.value) {
		const _img = img.value;
		if (_img.complete) {
			valid.value = _img.naturalWidth !== _img.naturalHeight;
			loaded.value = true;
		}
		else {
			_img.onload = () => {
				// fix https://app.clickup.com/t/2gnt4zp
				valid.value = _img.naturalWidth !== _img.naturalHeight;
				loaded.value = true;
			};
		}
	} else {
		loaded.value = true;
		valid.value = false
	}
});
</script>
