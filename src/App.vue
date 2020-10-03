<template>
    <flipper
        :flip-key="$route.path"
    >
        <router-view />
    </flipper>
</template>

<static-query>
query {
  metadata {
    siteName
    siteDescription
  }
}
</static-query>

<script>
import { Flipper } from 'vue-flip-toolkit'

export default {
    components: {
        Flipper,
    },
    metaInfo() {
        return {
            title: this.$static.metadata.siteName,
            meta: [
                {
                    key: 'description',
                    name: 'description',
                    content: this.$static.metadata.siteDescription,
                },
            ],
        }
    },
}
</script>
