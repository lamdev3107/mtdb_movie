# Checkbox Group Component

Component checkbox group tùy chỉnh với thiết kế hiện đại và nhiều tính năng linh hoạt.

## Cách sử dụng

```html
<app-checkbox-group [options]="checkboxOptions" [selectedValues]="selectedValues" [layout]="'vertical'" [maxSelections]="3" [disabled]="false" (onSelectionChange)="handleSelectionChange($event)"> </app-checkbox-group>
```

## Input Properties

- `options: CheckboxOption[]` - Danh sách các tùy chọn checkbox
- `selectedValues: any[]` - Mảng các giá trị đã được chọn
- `layout: 'vertical' | 'horizontal'` - Layout hiển thị (mặc định: 'vertical')
- `maxSelections?: number` - Số lượng tối đa có thể chọn (tùy chọn)
- `disabled: boolean` - Vô hiệu hóa toàn bộ component (mặc định: false)

## Output Events

- `onSelectionChange: EventEmitter<any[]>` - Emit mảng các giá trị đã chọn khi có thay đổi

## Interface CheckboxOption

```typescript
interface CheckboxOption {
  value: any;
  label: string;
  disabled?: boolean; // Tùy chọn vô hiệu hóa từng item
}
```

## Ví dụ sử dụng

```typescript
// Trong component
export class MyComponent {
  checkboxOptions: CheckboxOption[] = [
    { value: "action", label: "Hành động" },
    { value: "comedy", label: "Hài hước" },
    { value: "drama", label: "Tâm lý" },
    { value: "horror", label: "Kinh dị", disabled: true },
    { value: "romance", label: "Lãng mạn" },
  ];

  selectedValues: any[] = ["action", "comedy"];

  handleSelectionChange(selectedValues: any[]) {
    console.log("Các giá trị đã chọn:", selectedValues);
    this.selectedValues = selectedValues;
  }
}
```

## Layout Options

### Vertical Layout (mặc định)

```html
<app-checkbox-group [layout]="'vertical'"></app-checkbox-group>
```

### Horizontal Layout

```html
<app-checkbox-group [layout]="'horizontal'"></app-checkbox-group>
```

## Giới hạn số lượng chọn

```html
<!-- Chỉ cho phép chọn tối đa 3 tùy chọn -->
<app-checkbox-group [maxSelections]="3" [selectedValues]="selectedValues" (onSelectionChange)="handleSelectionChange($event)"> </app-checkbox-group>
```

## Tính năng

- ✅ **Multiple selection** - Chọn nhiều tùy chọn cùng lúc
- ✅ **Layout linh hoạt** - Vertical hoặc horizontal
- ✅ **Giới hạn số lượng** - Có thể giới hạn số tùy chọn tối đa
- ✅ **Individual disabled** - Vô hiệu hóa từng tùy chọn riêng lẻ
- ✅ **Global disabled** - Vô hiệu hóa toàn bộ component
- ✅ **Custom styling** - Thiết kế hiện đại với SCSS
- ✅ **Responsive** - Hoạt động tốt trên mobile và desktop
- ✅ **Accessibility** - Hỗ trợ keyboard navigation và screen readers
- ✅ **Animation** - Hiệu ứng mượt mà khi chọn/bỏ chọn
- ✅ **Selection counter** - Hiển thị số lượng đã chọn khi có giới hạn
- ✅ **Hover effects** - Hiệu ứng hover cho UX tốt hơn
- ✅ **Focus management** - Quản lý focus cho accessibility

## Styling

Component sử dụng SCSS với các biến CSS có thể tùy chỉnh:

- **Primary color**: #007bff
- **Border color**: #e1e5e9
- **Text color**: #495057
- **Disabled color**: #6c757d
- **Checkbox size**: 20px (18px trên mobile)
- **Border radius**: 4px cho checkbox, 6px cho option container

## Accessibility

- Hỗ trợ keyboard navigation (Tab, Space, Enter)
- ARIA labels và roles phù hợp
- Focus indicators rõ ràng
- Screen reader friendly
- High contrast support
