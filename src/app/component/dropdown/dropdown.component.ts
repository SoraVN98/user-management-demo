import { Component } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  @Input() treeData: any[] = [];
  isToggled : boolean = false;

  toggleNode(node: any) {
    if (node.children) {
      node.expanded = !node.expanded;
      this.isToggled = !this.isToggled;
    }
  }
}
