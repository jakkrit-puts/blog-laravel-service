<script setup lang="ts">
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const invoices = [
  {
    id: 1,
    title: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    id: 2,
    title: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    id: 3,
    title: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 4,
    title: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    id: 5,
    title: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    id: 6,
    title: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 7,
    title: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
]
</script>

<template>
  <Table>
    <!-- <TableCaption>A list of your recent blogs.</TableCaption> -->
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">
          #
        </TableHead>
        <TableHead class="w-[500px]">
          Title
        </TableHead>
        <TableHead>Author</TableHead>
        <TableHead>Date</TableHead>
        <TableHead>
          Status
        </TableHead>
        <TableHead class="text-center">
          Action
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="item in invoices" :key="item.id">
        <TableCell class="font-medium">
          {{ item.id }}
        </TableCell>
        <TableCell class="font-medium">
          {{ item.title }}
        </TableCell>
        <TableCell>{{ item.paymentStatus }}</TableCell>
        <TableCell>{{ item.paymentMethod }}</TableCell>
        <TableCell>
          {{ item.totalAmount }}
        </TableCell>
        <TableCell class="text-center">
          UPDATE|DELETE
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>