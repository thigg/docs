import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/item';
import '@vaadin/list-box';
import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

@customElement('list-box-multi-selection')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private accessor items: Person[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople({ count: 20 });
    this.items = people;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-list-box multiple .selectedValues="${[0, 3]}" style="height: 200px">
        ${this.items.map(
          (person) => html`<vaadin-item>${person.firstName} ${person.lastName}</vaadin-item> `
        )}
      </vaadin-list-box>
      <!-- end::snippet[] -->
    `;
  }
}
