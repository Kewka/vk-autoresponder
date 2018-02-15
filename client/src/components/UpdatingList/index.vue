<template>
  <v-list class="transparent" :three-line="lineCount === 3" :two-line="lineCount === 2" subheader>
      <v-subheader>
          <span v-text="`${header} (${(items && items.length) || 0}${showMax ? `/${maxCount}` : ''})`"></span>
          <v-spacer></v-spacer>
          <v-btn :loading="pending" @click="$emit('update')" icon>
              <v-icon>refresh</v-icon>
          </v-btn>
      </v-subheader>
      <v-divider></v-divider>
      <template v-if="items">
        <p v-if="items && !items.length" class="caption text-xs-center pa-2 ma-0" v-text="empty"></p>
        <transition-group v-else name="slide-x-transition" tag="div">
            <v-flex v-for="(item, i) in items" :key="item.id || item.uid || i">
                <slot :item="item"></slot>
                <v-divider v-if="divider && ++i < items.length"></v-divider>
            </v-flex>
        </transition-group>
      </template>
  </v-list>
</template>

<script>
export default {
    props: {
        header: String,
        lineCount: {
            type: Number,
            default: 1
        },
        maxCount: {
            type: [String, Number],
            default: 0
        },
        items: Array,
        pending: Boolean,
        showMax: Boolean,
        empty: String,
        divider: Boolean
    }
}
</script>

<style>
</style>
