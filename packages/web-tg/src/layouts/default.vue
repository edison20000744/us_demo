<template>
    <router-view></router-view>
</template>

<script lang="ts" setup>
import { useTheme } from '@us/web-tg/stores/theme';
const theme = useTheme();
theme.changeTheme();
</script>