<template>
  <div
    :class="`task-card`"
    :style="`
      background: ${config.saleCard.color}; 
      color: ${config.saleCard.textColor};
      font-size: ${config.saleCard.fontSize};
      padding: ${config.saleCard.padding};
    `"
  >
    <div class="task-card__header">
      <div class="task-card__title">{{ sale.name }}</div>
      <div class="task-card__executor">
        {{ sale.desc }}
      </div>
    </div>

    <div class="task-card__footer">
      <div class="task-card__date">
        {{ sale.date }}
      </div>
    </div>
  </div>
</template>

<script>
import IconCross from '@/components/icons/IconCross.vue'
export default {
  components: {
    IconCross
  },
  props: {
    sale: {
      type: Object,
      ruquired: true
    },
    config: {
      type: Object
    }
  },
  methods: {}
}
</script>
