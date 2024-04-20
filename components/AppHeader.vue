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
            <NavItem>
              <NavLink active to="/vehicle">
                Vehicle
              </NavLink>
            </NavItem>
          </NavbarNavList>
          <BForm flex>
            <b-a button="outline-light" href="/login" @click="logout">
              Logout
            </b-a>
          </BForm>
        </NavbarCollapse>
      </Container>
    </Navbar>
  </div>
</template>

<script setup>
const { authLogout } = useAuthStore();

const logout = async () => {
  await authLogout();
};
</script>