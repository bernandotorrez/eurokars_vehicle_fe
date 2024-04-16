<template>
  <div>
    <Navbar expand="lg" theme="dark" class="bg-primary">
      <Container type="fluid">
        <NavbarBrand to="/">Eurokars</NavbarBrand>
        <NavbarToggler />
        <NavbarCollapse>
          <NavbarNavList margin="e-auto b-2 b-lg-0">
            <NavItem>
              <NavLink active to="/about">
                About
              </NavLink>
            </NavItem>
          </NavbarNavList>
          <BForm flex>
            <b-a button="outline-light" href="/login">
              Login
            </b-a>
          </BForm>
        </NavbarCollapse>
      </Container>
    </Navbar>
  </div>
</template>

<script lang="ts" setup>

</script>

<style></style>