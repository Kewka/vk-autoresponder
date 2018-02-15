<template>
    <updating-list 
    header="Ответы" 
    empty="Вы не добавили ответы для автоответчика" 
    @update="load()" 
    :items="items"
    show-max 
    :max-count="100" 
    :pending="pending" 
    :line-count="3"
    divider
    >
        <answer-item @remove="remove($event)" slot-scope="props" :item="props.item"></answer-item>
    </updating-list>

</template>

<script>
import { mapActions, mapState } from 'vuex'
import UpdatingList from '@/components/UpdatingList'
import AnswerItem from '@/components/AnswerItem'

export default {
    computed: mapState('answers', ['items', 'pending']),
    methods: mapActions('answers', ['load', 'remove']),    
    components: {
        UpdatingList,
        AnswerItem
    }
}
</script>

<style>
</style>
