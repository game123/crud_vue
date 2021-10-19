/* eslint-disable eol-last */
import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue Test', () => {
  it('renders sub-components when the component is created', () => {
    // render the component
    const wrapper = shallowMount(App)

    // check that all 4 sub-components are used
    const headerElement = wrapper.findAll('.header-title')
    expect(headerElement[0].exists()).toBeTruthy()
    // eslint-disable-next-line no-trailing-spaces
    
    const navigationElement = wrapper.findAll('.navigation-links')
    expect(navigationElement[0].exists()).toBeTruthy()

    const contentElement = wrapper.findAll('.data-content')
    expect(contentElement[0].exists()).toBeTruthy()

    const footerElement = wrapper.findAll('.footer')
    expect(footerElement[0].exists()).toBeTruthy()
  })
})