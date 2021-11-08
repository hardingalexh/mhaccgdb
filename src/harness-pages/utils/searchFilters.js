import { components } from '@rtidatascience/harness-ui'
import { rarities, resources, keywords, types, sets } from '@/utils/lookups'
import resourcePicker from '@/components/utils/resourcePicker'

export default {
    rarity: {
        label: "Rarities",
        component: components['HarnessUiSelect'],
        props: {
            multiple: true,
            filterType: "Collection"
        },
        options: [
            {key: '', label: 'Any', default: true},
            ...Object.entries(rarities).map(e => {return {key: e[0].toLowerCase(), label: e[1]}})
        ]
    },
    collectors_sets: {
        label: "Sets",
        component: components['HarnessUiSelect'],
        props: {
            multiple: true,
            filterType: "Collection"
        },
        options: [
            {key: '', label: 'Any', default: true},
            ...sets.map(e => { return { key: e.toLowerCase(), label: e} })
        ]
    },
    resources: {
        label: "Resources",
        component: resourcePicker,
        props: {
            multiple: true,
            filterType: "Resources"
        },
        options: resources.map(r => {return { key: r.toLowerCase(), label: r}})
    },
    types: {
        label: "Types",
        component: components['HarnessUiSelect'],
        props: {
            multiple: true,
            filterType: "General"
        },
        options: [
            {key: '', label: 'Any', default: true},
            ...types.map(t => {return { key: t.toLowerCase(), label: t}})
        ]
    },
    title: {
        label: "Title Contains",
        component: components['HarnessUiInput'],
        props: {
            filterType: 'General'
        }
    },
    
    keywords: {
        label: "Keywords",
        component: components['HarnessUiSelect'],
        props: {
            multiple: true,
            filterType: "General"
        },
        options: [
            {key: '', label: 'Any', default: true},
            ...keywords.map(t => { return { key: t.toLowerCase(), label: t}})
        ]
    },
    
    abilities: {
        label:"Ability Text Contains",
        component: components['HarnessUiInput'],
        props: {
            filterType: "General"
        }
    },
    block_zone: {
        label: "Block Zone",
        component: components['HarnessUiCheckboxGroup'],
        props: {
            multiple: true,
            filterType: 'Block'
        },
        options: [
            {key: 'low', label: 'Low'},
            {key: 'mid', label: 'Mid'},
            {key: 'high', label: 'High'},
        ]
    },
    max_block_modifier: {
        label: "Max Block Modifier",
        component: components['HarnessUiInput'],
        props: {
            type: 'number',
            filterType: 'Block'
        }
    },
    attack_zone: {
        label: "Attack Zone",
        component: components['HarnessUiCheckboxGroup'],
        props: {
            multiple: true,
            filterType: "Attack"
        },
        options: [
            {key: 'low', label: 'Low'},
            {key: 'mid', label: 'Mid'},
            {key: 'high', label: 'High'},
        ]
    },
    min_speed: {
        label: "Minimum Attack Speed",
        component: components['HarnessUiInput'],
        props: {
            type: 'number',
            filterType: "Attack"
        },
    },
    min_damage: {
        label: "Minimum Attack Damage",
        component: components['HarnessUiInput'],
        props: {
            type: 'number',
            filterType: "Attack"
        },
    },
}