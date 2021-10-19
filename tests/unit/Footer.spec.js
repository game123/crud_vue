/* eslint-disable eol-last */
import { shallowMount } from '@vue/test-utils'
import Footer from '@/components/Footer.vue'

describe('Footer.vue Test', () => {
  it('renders message when component is created', () => {
    // render the component
    const wrapper = shallowMount(Footer)

    // check that the title is rendered
    expect(wrapper.text()).toMatch('TestDriven.io 2021')
  })
})