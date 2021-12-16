<template lang="pug">
    .block
        .management-layouts__content
            ManagementMedia
        .management-layouts__tw
            ManagementTwitter
</template>

<script>
import ManagementTwitter from '@/pages/management/Twitter';
import ManagementMedia from '@/pages/management/Media';
export default {
    name: 'ManagementPageIndex',
    components: {
        ManagementTwitter,
        ManagementMedia,
    },
};
</script>
