<template>
  <footer class="mt-24 border-t border-white/10">
    <div class="container-lg grid gap-8 py-10 md:grid-cols-3">
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <LogoMark class="h-6 w-6" />
          <span class="text-sm font-semibold tracking-wide">Archion</span>
        </div>
        <p class="muted">AI that turns goals into momentum.</p>
      </div>
      <div class="text-sm text-white/80">
        <p class="mb-2 font-semibold text-white">Product</p>
        <ul class="space-y-1">
          <li><a href="#features" class="hover:text-white">Features</a></li>
          <li><a href="#docs" class="hover:text-white">Docs</a></li>
          <li><a href="#pricing" class="hover:text-white">Pricing</a></li>
        </ul>
      </div>
      <div class="text-sm text-white/80">
        <p class="mb-2 font-semibold text-white">Company</p>
        <ul class="space-y-1">
          <li><a href="#about" class="hover:text-white">About</a></li>
          <li><a href="#contact" class="hover:text-white">Contact</a></li>
          <li><a href="#legal" class="hover:text-white">Legal</a></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-white/10 py-6 text-center text-xs text-white/50">
      © {{ new Date().getFullYear() }} Archion. All rights reserved.
    </div>
  </footer>
</template>
