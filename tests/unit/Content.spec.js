/* eslint-disable eol-last */
import { shallowMount } from '@vue/test-utils'
import Content from '@/components/Content.vue'

describe('Content.vue Test', () => {
  it('renders message when component is created', () => {
    // render the component
    const wrapper = shallowMount(Content)

    // check that the heading text is rendered
    const heading = wrapper.findAll('h1')
    expect(heading.length).toEqual(1)
    expect(heading[0].text()).toMatch('List of Users:')
  })
})