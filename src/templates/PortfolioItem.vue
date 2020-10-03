<template>
    <layout>
        <flipped :flip-id="`portfolio-cover-${$page.entry.fileInfo.name}`">
            <div>
                <g-image
                    class="creations-list-item-coverImage"
                    :src="$page.entry.coverImage"
                    :alt="$t('portfolio.coverImageAlt', { title: $page.entry.title })"
                />
            </div>
        </flipped>

        <flipped :flip-id="`portfolio-title-${$page.entry.fileInfo.name}`">
            <h1 class="portfolio-item-title">
                {{ $page.entry.title }}
            </h1>
        </flipped>

        <flipped :flip-id="`portfolio-excerpt-${$page.entry.fileInfo.name}`">
            <p class="portfolio-item-excerpt">
                {{ $page.entry.excerpt }}
            </p>
        </flipped>

        <p>
            <b-button
                class="portfolio-item-link"
                :href="$page.entry.link"
                target="_blank"
                rel="noopener"
            >
                {{ $t('portfolio.visitWebsite') }}
            </b-button>
        </p>

        <div
            class="portfolio-item-content"
            v-html="$page.entry.content"
        />

        <g-image
            v-for="(screenshot, index) in $page.entry.screenshots"
            :key="`portfolio-item-screenshot-${index}`"
            class="portfolio-item-screenshot d-block mb-3 mx-auto"
            :src="screenshot"
        />
    </layout>
</template>

<script>
import {
    BButton,
} from 'bootstrap-vue'
import { Flipped } from 'vue-flip-toolkit'

export default {
    components: {
        BButton,
        Flipped,
    },
}
</script>

<page-query>
  query PortfolioItem($id: ID!) {
    entry: portfolioItem(id: $id) {
      title
      excerpt
      link
      coverImage
      content
      screenshots
      featured
      fileInfo {
        name
      }
    }
  }
</page-query>
