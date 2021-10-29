/* eslint-disable eol-last */
import { shallowMount } from '@vue/test-utils'
import Footer from '@/components/Footer.vue'

describe('Footer.vue Test', () => {
  it('renders message when component is created', () => {
    // render the component
    const wrapper = shallowMount(Footer, {
      props: {
        footerMessage: 'KC Side Project Vue#1 2021'
      }
    })

    // check that the title is rendered
    expect(wrapper.text()).toMatch('KC Side Project Vue#1 2021')
  })
})