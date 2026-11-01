import pypsa


def main():
    # Create a new network
    n = pypsa.Network()
    n.add("Bus", "mybus")
    n.add("Load", "myload", bus="mybus", p_set=100)
    n.add("Generator", "mygen", bus="mybus", p_nom=100, marginal_cost=20)

    # load an example network
    n = pypsa.examples.ac_dc_meshed()

    # run the optimisation
    n.optimize()

    # plot results
    #n.generators_t.p.plot()
    #n.plot()

    # get statistics
    #n.statistics()
    #n.statistics.energy_balance()


if __name__ == "__main__":
    main()
